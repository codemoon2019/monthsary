import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
}

export function Section({
  id,
  children,
  className = '',
  title,
  subtitle,
}: SectionProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id={id}
      className={`relative px-5 py-20 md:px-8 md:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        {(title || subtitle) && (
          <motion.div
            className="mb-12 text-center md:mb-16"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {title && (
              <h2 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto mt-4 max-w-xl text-base font-light text-ink-muted md:text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
