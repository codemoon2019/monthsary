import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({
  children,
  className = '',
  hover = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-3xl p-6 md:p-8 ${className}`}
      whileHover={
        hover
          ? { y: -4, scale: 1.02, transition: { duration: 0.25 } }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}
