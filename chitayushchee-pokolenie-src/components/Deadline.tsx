'use client'
import { useEffect, useState } from 'react'
import { deadlineText } from './deadline-date'

// На сервере рендерится дата сборки, на клиенте — реальная «сегодня + 2».
// suppressHydrationWarning гасит ожидаемое расхождение первого рендера.
export function Deadline() {
  const [text, setText] = useState(() => deadlineText())
  useEffect(() => setText(deadlineText()), [])
  return <span suppressHydrationWarning>{text}</span>
}
