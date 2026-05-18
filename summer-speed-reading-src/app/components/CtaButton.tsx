import React from 'react'

type Variant = 'primary' | 'ghost' | 'on-dark'

type Props = {
  href?: string
  variant?: Variant
  size?: 'md' | 'lg'
  className?: string
  children: React.ReactNode
  icon?: string
  type?: 'button' | 'submit'
  fullWidth?: boolean
  onClick?: () => void
  disabled?: boolean
}

/**
 * Premium button with nested "button-in-button" trailing icon circle.
 * Use icon='→' for default arrow, or pass any single-char/emoji.
 */
export default function CtaButton({
  href,
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  icon = '→',
  type = 'button',
  fullWidth,
  onClick,
  disabled,
}: Props) {
  const variantClass = `btn--${variant}`
  const sizeClass = size === 'lg' ? 'btn--lg' : ''
  const cls = `btn ${variantClass} ${sizeClass} ${className}`.trim()

  const content = (
    <>
      <span>{children}</span>
      <span className="btn__icon" aria-hidden>
        {icon}
      </span>
    </>
  )

  const style: React.CSSProperties = fullWidth ? { width: '100%' } : {}
  if (disabled) style.opacity = 0.7

  if (href) {
    return (
      <a href={href} className={cls} style={style}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={cls} style={style} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}
