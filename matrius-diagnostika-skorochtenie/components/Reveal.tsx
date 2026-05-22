'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
} & Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'whileInView' | 'transition' | 'viewport'>

const APPLE = [0.32, 0.72, 0, 1] as const

export default function Reveal({ children, delay = 0, y = 24, className, ...rest }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: APPLE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
