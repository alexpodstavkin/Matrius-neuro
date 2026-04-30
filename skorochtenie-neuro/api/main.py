"""
FastAPI-прокси формы → GetCourse API.

Принимает JSON от лендинга https://web.matrius.online/skorochtenie-neuro/,
делает фоновой POST на /pl/api/deals с секретным ключом GC и возвращает
фронту 202 Accepted сразу, без ожидания GC.

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

import asyncio
import base64
import hashlib
import json
import logging
import os
import time
from typing import Any

import httpx
from fastapi import BackgroundTasks, FastAPI, HTTPException, Request
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

GC_TIMEOUT_S = 10.0
GC_MAX_RETRIES = 3


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
    child: str | None = Field(default=None, max_length=120)

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

    @field_validator("child")
    @classmethod
    def _strip_child(cls, v: str | None) -> str | None:
        if v is None:
            return None
        v = v.strip()
        return v or None


# ──────────────────────────────────────────────────────────────────────
# App
# ──────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Matrius landing → GetCourse proxy",
    version="1.1.0",
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


def _deal_number(email: str, offer: str) -> str:
    """Детерминированный, уникальный с минутным окном номер заказа.
    Защита от дублей при повторных кликах на submit, но новые заявки
    того же лида в другой день — это новые сделки.
    """
    bucket = int(time.time()) // 60  # минутный бакет
    raw = f"{email}|{offer}|{bucket}".encode("utf-8")
    h = hashlib.sha1(raw).hexdigest()[:10]
    return f"web-{h}"


def _build_gc_params(payload: BookingPayload, request_referer: str | None) -> dict[str, Any]:
    parts = payload.name.strip().split(maxsplit=1)
    first_name = parts[0]
    last_name = parts[1] if len(parts) > 1 else ""

    addfields: dict[str, str] = {"Возраст ребёнка": payload.age}
    if payload.child:
        addfields["Имя ребёнка"] = payload.child

    note_lines = [f"Возраст ребёнка: {payload.age}"]
    if payload.child:
        note_lines.append(f"Имя ребёнка: {payload.child}")
    deal_comment = "\n".join(note_lines)

    user_obj: dict[str, Any] = {
        "email": payload.email,
        "phone": payload.phone,
        "first_name": first_name,
        "last_name": last_name,
        "addfields": addfields,
    }

    session_obj: dict[str, str] = {}
    for f in ("referer", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"):
        v = getattr(payload, f, None)
        if v:
            session_obj[f] = v
    if "referer" not in session_obj and request_referer:
        session_obj["referer"] = request_referer

    deal_obj: dict[str, Any] = {
        "offer_code": GC_OFFER_CODE,
        "deal_status": "Новый",
        "deal_comment": deal_comment,
        "deal_number": _deal_number(payload.email, GC_OFFER_CODE),
    }

    return {
        "user": user_obj,
        "system": {"refresh_if_exists": 1, "return_deal_number": 1},
        "session": session_obj,
        "deal": deal_obj,
    }


async def _gc_post_once(client: httpx.AsyncClient, params: dict[str, Any]) -> tuple[int, dict[str, Any] | None, str]:
    encoded = base64.b64encode(
        json.dumps(params, ensure_ascii=False).encode("utf-8")
    ).decode("ascii")
    body = {"action": "add", "key": GC_SECRET_KEY, "params": encoded}
    url = f"https://{gc_host()}/pl/api/deals"

    resp = await client.post(
        url,
        data=body,
        headers={"Accept": "application/json; q=1.0, */*; q=0.1"},
    )
    text = resp.text
    try:
        return resp.status_code, resp.json(), text
    except ValueError:
        return resp.status_code, None, text


async def gc_send_with_retries(payload: BookingPayload, request_referer: str | None) -> None:
    """Отправляет заявку в GC c ретраями. Логирует исход.
    Не выбрасывает исключение — все ошибки логируются, фронт ничего не ждёт.
    """
    if not (GC_ACCOUNT and GC_SECRET_KEY and GC_OFFER_CODE):
        log.error("env missing: account=%s key=%s offer=%s",
                  bool(GC_ACCOUNT), bool(GC_SECRET_KEY), bool(GC_OFFER_CODE))
        return

    params = _build_gc_params(payload, request_referer)
    deal_number = params["deal"]["deal_number"]

    last_error: str | None = None
    async with httpx.AsyncClient(timeout=GC_TIMEOUT_S) as client:
        for attempt in range(1, GC_MAX_RETRIES + 1):
            try:
                status, data, raw = await _gc_post_once(client, params)
            except httpx.TimeoutException:
                last_error = "timeout"
                log.warning("[%s] attempt %d: GC timeout", deal_number, attempt)
            except httpx.HTTPError as e:
                last_error = f"http_error: {e}"
                log.warning("[%s] attempt %d: %s", deal_number, attempt, last_error)
            else:
                if data is None:
                    last_error = f"non_json_{status}: {raw[:200]}"
                    log.warning("[%s] attempt %d: %s", deal_number, attempt, last_error)
                elif data.get("success"):
                    result = data.get("result") or {}
                    log.info("[%s] OK: user_id=%s deal_id=%s deal_number=%s",
                             deal_number,
                             result.get("user_id"),
                             result.get("deal_id"),
                             result.get("deal_number"))
                    return
                else:
                    err = (data.get("result") or {}).get("error_message") or "unknown"
                    last_error = f"gc_error: {err}"
                    log.warning("[%s] attempt %d: %s | full: %s",
                                deal_number, attempt, last_error,
                                json.dumps(data, ensure_ascii=False)[:300])
                    # 4xx-эквивалент (логическая ошибка GC) — не ретраим
                    if status < 500:
                        log.error("[%s] FINAL fail (logic): %s", deal_number, last_error)
                        return

            if attempt < GC_MAX_RETRIES:
                # экспоненциальный back-off: 1s, 2s, 4s
                await asyncio.sleep(2 ** (attempt - 1))

    log.error("[%s] FINAL fail after %d attempts: %s", deal_number, GC_MAX_RETRIES, last_error)


@app.post("/api/booking", status_code=202)
async def booking(
    payload: BookingPayload,
    background: BackgroundTasks,
    request: Request,
) -> dict[str, Any]:
    """Принимаем форму, валидируем, отвечаем 202 сразу.
    Отправка в GC уходит в фон с ретраями."""
    if not (GC_ACCOUNT and GC_SECRET_KEY and GC_OFFER_CODE):
        log.error("env missing on request — won't queue")
        raise HTTPException(status_code=500, detail="server_misconfigured")

    referer = request.headers.get("referer")
    background.add_task(gc_send_with_retries, payload, referer)

    return {"ok": True, "queued": True}
