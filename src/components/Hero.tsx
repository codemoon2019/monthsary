import { motion } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import { content } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { FloatingHearts } from './ui/FloatingHearts'

export function Hero() {
  const reduced = usePrefersReducedMotion()

  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 pb-16 pt-24">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,194,209,0.55),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(205,180,219,0.4),_transparent_50%),linear-gradient(180deg,_#FFF8F6_0%,_#FFECEF_45%,_#FFF8F6_100%)]"
        aria-hidden="true"
      />
      <FloatingHearts count={8} />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.div
          className="mb-6 inline-flex items-center justify-center"
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="text-blush"
            animate={
              reduced
                ? undefined
                : { y: [0, -6, 0], scale: [1, 1.08, 1] }
            }
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={28} fill="currentColor" strokeWidth={0} />
          </motion.span>
        </motion.div>

        <motion.h1
          className="font-display text-5xl font-medium leading-[1.1] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.hero.title}{' '}
          <span className="text-blush" aria-hidden="true">
            ♥
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-ink-muted md:text-xl"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            type="button"
            onClick={scrollToTimeline}
            className="inline-flex items-center gap-2 rounded-full bg-blush px-8 py-3.5 text-sm font-medium tracking-wide text-white shadow-[0_12px_30px_rgba(255,122,162,0.35)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
          >
            {content.hero.cta}
          </button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToTimeline}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ink-muted/70 transition-colors hover:text-blush focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
        aria-label="Scroll to our story"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </motion.button>
    </header>
  )
}
