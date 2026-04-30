"""GetCourse API client — копия snippet'а из anthropic-skill `getcourse-api`
(scripts/gc_api.py), без CLI и `_load_dotenv`.

Документация: https://getcourse.ru/help/api

Endpoints:
    POST https://{account}.getcourse.ru/pl/api/deals   (action=add)
    POST https://{account}.getcourse.ru/pl/api/users   (action=add)

Использование:
    from gc_client import GetCourseClient
    gc = GetCourseClient()  # читает GC_ACCOUNT/GC_SECRET_KEY из env
    gc.create_deal(user={...}, deal={...})
    gc.update_user(email=..., addfields={...}, groups=[...])
"""

from __future__ import annotations

import base64
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Iterable


class GetCourseError(RuntimeError):
    """Ошибка вызова GetCourse API."""


class GetCourseClient:
    def __init__(
        self,
        account: str | None = None,
        secret_key: str | None = None,
        timeout: float = 15.0,
    ) -> None:
        self.account = account or os.environ.get("GC_ACCOUNT") or ""
        self.secret_key = secret_key or os.environ.get("GC_SECRET_KEY") or ""
        self.timeout = timeout
        if not self.account or not self.secret_key:
            raise GetCourseError("Не заданы GC_ACCOUNT и/или GC_SECRET_KEY")

    def _host(self) -> str:
        # GC_ACCOUNT может быть поддоменом ('matrius') или полным доменом ('school-genius.club')
        return self.account if "." in self.account else f"{self.account}.getcourse.ru"

    def _endpoint(self, path: str) -> str:
        return f"https://{self._host()}/pl/api/{path}"

    def _call(self, path: str, params: dict[str, Any], action: str = "add") -> dict[str, Any]:
        raw = json.dumps(params, ensure_ascii=False).encode("utf-8")
        encoded = base64.b64encode(raw).decode("ascii")
        body = urllib.parse.urlencode(
            {"action": action, "key": self.secret_key, "params": encoded}
        ).encode("utf-8")

        req = urllib.request.Request(
            self._endpoint(path),
            data=body,
            method="POST",
            headers={
                "Accept": "application/json; q=1.0, */*; q=0.1",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                payload = resp.read().decode("utf-8")
        except urllib.error.HTTPError as exc:
            err_body = exc.read().decode("utf-8", errors="replace")
            raise GetCourseError(f"HTTP {exc.code}: {err_body}") from exc
        except urllib.error.URLError as exc:
            raise GetCourseError(f"Сетевая ошибка: {exc.reason}") from exc

        try:
            data = json.loads(payload)
        except json.JSONDecodeError as exc:
            raise GetCourseError(f"Не-JSON ответ: {payload[:500]}") from exc

        if not data.get("success", True):
            result = data.get("result") or {}
            msg = result.get("error_message") or data.get("error_message") or "unknown"
            raise GetCourseError(f"GetCourse вернул ошибку: {msg} (raw: {data})")
        # GC любит отвечать success:true на верхнем уровне и success:false внутри result —
        # это «soft fail», который раньше проглатывался. Теперь падаем явно.
        result = data.get("result") or {}
        if result and (result.get("error") is True or result.get("success") is False):
            msg = result.get("error_message") or "unknown"
            raise GetCourseError(f"GetCourse вернул ошибку: {msg} (raw: {data})")
        return data

    def create_deal(
        self,
        user: dict[str, Any],
        deal: dict[str, Any],
        *,
        system: dict[str, Any] | None = None,
        session: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        if not user.get("email"):
            raise GetCourseError("user.email обязателен")
        if not (deal.get("offer_code") or deal.get("product_title")):
            raise GetCourseError("В deal нужен offer_code или product_title")

        params = {
            "user": user,
            "system": {
                "refresh_if_exists": 1,
                "return_payment_link": 1,
                "return_deal_number": 1,
                **(system or {}),
            },
            "session": session or {},
            "deal": deal,
        }
        return self._call("deals", params)

    def update_user(
        self,
        email: str,
        *,
        addfields: dict[str, Any] | None = None,
        first_name: str | None = None,
        last_name: str | None = None,
        phone: str | None = None,
        groups: Iterable[str] | None = None,
        extra: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        user: dict[str, Any] = {"email": email}
        if first_name is not None:
            user["first_name"] = first_name
        if last_name is not None:
            user["last_name"] = last_name
        if phone is not None:
            user["phone"] = phone
        if addfields:
            user["addfields"] = dict(addfields)
        if groups:
            user["group_name"] = list(groups)
        if extra:
            user.update(extra)

        return self._call("users", {"user": user, "system": {"refresh_if_exists": 1}})

    def add_user_to_groups(self, email: str, groups: Iterable[str]) -> dict[str, Any]:
        groups = list(groups)
        if not groups:
            raise GetCourseError("groups пустой")
        return self.update_user(email=email, groups=groups)
