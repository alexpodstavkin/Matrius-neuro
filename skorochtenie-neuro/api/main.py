"""
FastAPI-прокси формы → GetCourse.

Использует готовый клиент `GetCourseClient` из anthropic-skill `getcourse-api`
(копия в gc_client.py). Никаких самописных HTTP-вызовов — просто

    gc = GetCourseClient()
    gc.create_deal(user={...}, deal={...}, session={...})

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

import logging
import os
from typing import Any

from fastapi import BackgroundTasks, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator

from gc_client import GetCourseClient, GetCourseError

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
    version="2.0.0",
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
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "offer_code_set": bool(GC_OFFER_CODE),
        "secret_key_set": bool(GC_SECRET_KEY),
        "allowed_origins": ALLOWED_ORIGINS,
    }


def _send_to_gc(payload: BookingPayload, request_referer: str | None) -> None:
    """Фоновая отправка в GC через snippet-клиент. Никогда не бросает —
    все ошибки логируются, фронт получит 202 раньше любого сетевого вызова."""
    if not (GC_ACCOUNT and GC_SECRET_KEY and GC_OFFER_CODE):
        log.error(
            "env missing: account=%s key=%s offer=%s",
            bool(GC_ACCOUNT), bool(GC_SECRET_KEY), bool(GC_OFFER_CODE),
        )
        return

    try:
        gc = GetCourseClient(account=GC_ACCOUNT, secret_key=GC_SECRET_KEY)
    except GetCourseError as e:
        log.error("gc client init failed: %s", e)
        return

    parts = payload.name.strip().split(maxsplit=1)
    first_name = parts[0]
    last_name = parts[1] if len(parts) > 1 else ""

    addfields: dict[str, Any] = {"Возраст ребёнка": payload.age}
    note_lines = [f"Возраст ребёнка: {payload.age}"]
    if payload.child:
        addfields["Имя ребёнка"] = payload.child
        note_lines.append(f"Имя ребёнка: {payload.child}")

    user: dict[str, Any] = {
        "email": str(payload.email),
        "phone": payload.phone,
        "first_name": first_name,
        "addfields": addfields,
    }
    # Этот аккаунт GC валидирует last_name и не принимает пустую строку.
    # Передаём только когда в форме реально ввели два слова.
    if last_name:
        user["last_name"] = last_name

    # UTM-метки в доп. поля сделки (имена в админке GC: utm_*_c).
    # Если метки нет — кладём 'no-detected', чтобы было видно «органику» и
    # отчёты GC не путались с пустыми ячейками.
    deal_addfields = {
        "utm_source_c":   payload.utm_source   or "no-detected",
        "utm_medium_c":   payload.utm_medium   or "no-detected",
        "utm_campaign_c": payload.utm_campaign or "no-detected",
        "utm_content_c":  payload.utm_content  or "no-detected",
        "utm_term_c":     payload.utm_term     or "no-detected",
    }

    deal = {
        "offer_code": GC_OFFER_CODE,
        "deal_status": "Новый",
        "deal_cost": "1",
        "deal_comment": "\n".join(note_lines),
        "addfields": deal_addfields,
    }

    session = {
        k: v
        for k, v in {
            "utm_source": payload.utm_source,
            "utm_medium": payload.utm_medium,
            "utm_campaign": payload.utm_campaign,
            "utm_content": payload.utm_content,
            "utm_term": payload.utm_term,
            "referer": payload.referer or request_referer,
        }.items()
        if v
    }

    try:
        resp = gc.create_deal(user=user, deal=deal, session=session)
        result = resp.get("result", {}) or {}
        log.info(
            "[%s] OK: user_id=%s deal_id=%s deal_number=%s user_status=%s",
            payload.email,
            result.get("user_id"),
            result.get("deal_id"),
            result.get("deal_number"),
            result.get("user_status"),
        )
    except GetCourseError as e:
        log.error("[%s] GC FAIL: %s", payload.email, e)


@app.post("/api/booking", status_code=202)
def booking(
    payload: BookingPayload,
    background: BackgroundTasks,
    request: Request,
) -> dict[str, Any]:
    """Принимаем форму → 202 сразу → отправка в GC уходит в фон."""
    if not (GC_ACCOUNT and GC_SECRET_KEY and GC_OFFER_CODE):
        log.error("env missing on request — won't queue")
        raise HTTPException(status_code=500, detail="server_misconfigured")

    referer = request.headers.get("referer")
    background.add_task(_send_to_gc, payload, referer)

    return {"ok": True, "queued": True}
