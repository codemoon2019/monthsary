import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { content } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Section } from './ui/Section'
import { FloatingHearts } from './ui/FloatingHearts'

async function fireConfetti(reduced: boolean) {
  const confetti = (await import('canvas-confetti')).default
  const colors = ['#FF7AA2', '#FFC2D1', '#CDB4DB', '#FFF8F6']

  if (reduced) {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.65 },
      colors,
    })
    return
  }

  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.7 },
    colors,
  })
  window.setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    })
  }, 200)
}

export function Surprise() {
  const [open, setOpen] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleOpen = async () => {
    setOpen(true)
    try {
      await fireConfetti(reduced)
    } catch {
      // Confetti is decorative; ignore load failures.
    }
  }

  return (
    <>
      <Section id="surprise" title="A Little Surprise" subtitle="Just for you.">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blush to-[#ff8fb0] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_16px_40px_rgba(255,122,162,0.35)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
          >
            {content.surprise.buttonLabel}
            <Heart size={16} fill="currentColor" strokeWidth={0} />
          </button>
        </div>
      </Section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-5 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Surprise message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FloatingHearts count={8} dense />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 rounded-full bg-cream/90 p-2 text-ink shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
              aria-label="Close surprise"
            >
              <X size={20} />
            </button>

            <motion.div
              className="relative z-10 mx-auto max-w-xl text-center"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="mb-6 inline-flex text-blush"
                animate={
                  reduced
                    ? undefined
                    : { scale: [1, 1.12, 1], y: [0, -6, 0] }
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={36} fill="currentColor" strokeWidth={0} />
              </motion.div>
              {content.surprise.message.map((line, index) => (
                <p
                  key={index}
                  className={`font-display text-3xl font-medium leading-snug text-cream-soft md:text-4xl ${
                    index > 0 ? 'mt-4 text-blush-soft' : ''
                  }`}
                >
                  {line}
                  {index === content.surprise.message.length - 1 && (
                    <span aria-hidden="true"> ♥</span>
                  )}
                </p>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
