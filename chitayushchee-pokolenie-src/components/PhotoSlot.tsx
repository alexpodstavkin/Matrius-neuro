'use client'
import { useState } from 'react'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Место под фото. Если файла нет — показывает аккуратную заглушку в палитре бренда,
// вёрстка при этом не разъезжается: размеры держит родитель.
export function PhotoSlot({ src, alt, className = '', label }: { src: string; alt: string; className?: string; label?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-blue-tint text-center text-[14px] text-muted-weak ${className}`}>
        {label || 'Место для фото'}
      </div>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`${BASE}${src}`} alt={alt} className={className} onError={() => setFailed(true)} />
}
