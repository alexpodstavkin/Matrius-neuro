'use client'

import { useEffect } from 'react'

// 1-в-1 с /matrius-summer-school/: метки снимаются при первой загрузке и живут
// в sessionStorage, чтобы форма отправила их даже после скролла и переходов по якорям.
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

export function UtmCapture() {
  useEffect(() => {
    try {
      const url = new URLSearchParams(window.location.search)
      let stored: Record<string, string> = {}
      try {
        stored = JSON.parse(sessionStorage.getItem('mx_utm') || '{}')
      } catch {}
      let changed = false
      for (const k of UTM_KEYS) {
        const v = url.get(k)
        if (v) {
          stored[k] = v.slice(0, 256)
          changed = true
        }
      }
      if (changed) sessionStorage.setItem('mx_utm', JSON.stringify(stored))
    } catch {
      /* sessionStorage может быть недоступен */
    }
  }, [])
  return null
}
