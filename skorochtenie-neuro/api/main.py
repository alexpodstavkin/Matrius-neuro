"""
FastAPI-прокси формы → GetCourse API.

Принимает JSON от лендинга https://web.matrius.online/skorochtenie-neuro/,
делает серверный POST на /pl/api/deals с секретным ключом GC и возвращает
фронту {"ok": true/false}.

Env-переменные:
  GC_ACCOUNT       — поддомен (matrius) или полный домен (school-genius.club)
  GC_SECRET_KEY    — секретный ключ GC: Настройки → Общее → API
  GC_OFFER_CODE    — код оффера (`8331347` или текстовый alias)
  ALLOWED_ORIGINS  — запятая-разделённый список origin'ов для CORS
                     (по умолчанию: https://web.matrius.online,
                                    https://alexpodstavkin.github.io)

Локальный запуск:
  pip install -r requirements.txt
  GC_ACCOUNT=school-genius.club \
  GC_SECRET_KEY=xxx \
  GC_OFFER_CODE=8331347 \
  uvicorn main:app --reload --port 8000

Деплой на Render: см. README.md.
"""

from __future__ import annotations

import base64
import json
import logging
import os
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("matrius-gc")


def _env(name: str, default: str = "") -> str:
    v = os.getenv(name, default)
    return v.strip() if v else default


GC_ACCOUNT = _env("GC_ACCOUNT")
GC_SECRET_KEY = _env("GC_SECRET_KEY")
GC_OFFER_CODE = _env("GC_OFFER_CODE")

DEFAULT_ORIGINS = "https://web.matrius.online,https://alexpodstavkin.github.io"
ALLOWED_ORIGINS = [
    o.strip().rstrip("/")
    for o in _env("ALLOWED_ORIGINS", DEFAULT_ORIGINS).split(",")
    if o.strip()
]


def gc_host() -> str:
    """`matrius` → `matrius.getcourse.ru`; `school-genius.club` → `school-genius.club`."""
    if not GC_ACCOUNT:
        raise RuntimeError("GC_ACCOUNT не задан")
    return GC_ACCOUNT if "." in GC_ACCOUNT else f"{GC_ACCOUNT}.getcourse.ru"


# ──────────────────────────────────────────────────────────────────────
# Schemas
# ──────────────────────────────────────────────────────────────────────


class BookingPayload(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=4, max_length=32)
    email: EmailStr
    age: str = Field(min_length=1, max_length=64)

    referer: str | None = None
    utm_source: str | None = None
    utm_medium: str | None = None
    utm_campaign: str | None = None
    utm_content: str | None = None
    utm_term: str | None = None

    @field_validator("phone")
    @classmethod
    def _strip_phone(cls, v: str) -> str:
        return v.strip()


# ──────────────────────────────────────────────────────────────────────
# App
# ──────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Matrius landing → GetCourse proxy",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
    max_age=86400,
)


@app.get("/health")
async def health() -> dict[str, Any]:
    return {
        "ok": True,
        "gc_host": gc_host() if GC_ACCOUNT else None,
        "offer_code_set": bool(GC_OFFER_CODE),
        "secret_key_set": bool(GC_SECRET_KEY),
        "allowed_origins": ALLOWED_ORIGINS,
    }


@app.post("/api/booking")
async def booking(payload: BookingPayload, request: Request) -> dict[str, Any]:
    if not (GC_ACCOUNT and GC_SECRET_KEY and GC_OFFER_CODE):
        log.error("env missing: account=%s key=%s offer=%s",
                  bool(GC_ACCOUNT), bool(GC_SECRET_KEY), bool(GC_OFFER_CODE))
        raise HTTPException(status_code=500, detail="server_misconfigured")

    parts = payload.name.strip().split(maxsplit=1)
    first_name = parts[0]
    last_name = parts[1] if len(parts) > 1 else ""

    age_note = f"Возраст ребёнка: {payload.age}"

    user_obj: dict[str, Any] = {
        "email": payload.email,
        "phone": payload.phone,
        "first_name": first_name,
        "last_name": last_name,
        "addfields": {"Возраст ребёнка": payload.age},
    }

    session_obj: dict[str, str] = {}
    for f in ("referer", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"):
        v = getattr(payload, f, None)
        if v:
            session_obj[f] = v
    if "referer" not in session_obj:
        ref = request.headers.get("referer")
        if ref:
            session_obj["referer"] = ref

    deal_obj: dict[str, Any] = {
        "offer_code": GC_OFFER_CODE,
        "deal_status": "Новый",
        "deal_comment": age_note,
        "deal_number": f"web-{int(__import__('time').time() * 1000)}",
    }

    params = {
        "user": user_obj,
        "system": {"refresh_if_exists": 1, "return_deal_number": 1},
        "session": session_obj,
        "deal": deal_obj,
    }

    encoded = base64.b64encode(json.dumps(params, ensure_ascii=False).encode("utf-8")).decode("ascii")
    body = {"action": "add", "key": GC_SECRET_KEY, "params": encoded}

    url = f"https://{gc_host()}/pl/api/deals"

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(
                url,
                data=body,
                headers={"Accept": "application/json; q=1.0, */*; q=0.1"},
            )
        text = resp.text
        try:
            data = resp.json()
        except ValueError:
            log.warning("GC non-JSON %s: %s", resp.status_code, text[:300])
            return {"ok": False, "status": resp.status_code, "raw": text[:500]}

        success = bool(data.get("success"))
        if not success:
            err = (data.get("result") or {}).get("error_message") or "unknown"
            log.warning("GC error: %s | full: %s", err, json.dumps(data, ensure_ascii=False)[:500])
        else:
            log.info("GC ok: %s", json.dumps(data.get("result", {}), ensure_ascii=False)[:300])
        return {"ok": success, "gc": data}

    except httpx.TimeoutException:
        log.error("GC timeout")
        raise HTTPException(status_code=504, detail="gc_timeout")
    except httpx.HTTPError as e:
        log.error("GC http error: %s", e)
        raise HTTPException(status_code=502, detail="gc_unreachable")
