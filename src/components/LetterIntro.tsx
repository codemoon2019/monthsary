import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface LetterIntroProps {
  onOpen: () => void
  onComplete: () => void
}

const FLOATS = [
  { left: '-12%', top: '8%', size: 14, delay: 0 },
  { left: '96%', top: '18%', size: 12, delay: 0.6 },
  { left: '-8%', top: '72%', size: 11, delay: 1.1 },
  { left: '102%', top: '68%', size: 13, delay: 1.7 },
]

const BURST = [
  { x: -36, y: -28, size: 14, delay: 0 },
  { x: 32, y: -34, size: 12, delay: 0.04 },
  { x: -18, y: -48, size: 16, delay: 0.08 },
  { x: 22, y: -52, size: 11, delay: 0.12 },
  { x: 0, y: -58, size: 13, delay: 0.06 },
  { x: -40, y: -8, size: 10, delay: 0.1 },
  { x: 38, y: -10, size: 12, delay: 0.14 },
]

export function LetterIntro({ onOpen, onComplete }: LetterIntroProps) {
  const reduced = usePrefersReducedMotion()
  const [opening, setOpening] = useState(false)

  useEffect(() => {
    if (!reduced) return
    onOpen()
    onComplete()
  }, [onComplete, onOpen, reduced])

  if (reduced) return null

  const openLetter = () => {
    if (opening) return
    onOpen()
    setOpening(true)
    window.setTimeout(onComplete, 4200)
  }

  return (
    <motion.div
      className="letter-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: 1.2, delay: opening ? 2.4 : 0 }}
    >
      <motion.button
        type="button"
        className="letter-envelope border-0 bg-transparent p-0"
        onClick={openLetter}
        aria-label="Open the letter"
        animate={opening ? { y: 0, scale: 1 } : { y: [0, -8, 0], scale: 1 }}
        whileTap={opening ? undefined : { scale: 0.94, y: 4 }}
        transition={
          opening
            ? { duration: 0.4 }
            : { y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.18 } }
        }
      >
        {FLOATS.map((heart, index) => (
          <motion.span
            key={index}
            className="letter-float"
            style={{ left: heart.left, top: heart.top }}
            animate={
              opening
                ? { opacity: 0 }
                : { opacity: [0.35, 0.9, 0.35], y: [0, -8, 0] }
            }
            transition={{
              duration: 3.2 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: heart.delay,
            }}
            aria-hidden="true"
          >
            <Heart size={heart.size} fill="currentColor" strokeWidth={0} />
          </motion.span>
        ))}

        <motion.div
          className="letter-flap"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: opening ? 0 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: opening ? 0.2 : 0 }}
        />

        <div className="letter-pocket">
          <span className="letter-stamp" aria-hidden="true" />
          <motion.div
            className="letter-sheet"
            initial={{ y: 18, opacity: 0.7 }}
            animate={
              opening
                ? { y: -48, opacity: 1, scale: 1.04 }
                : { y: 18, opacity: 0.85 }
            }
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: opening ? 0.7 : 0 }}
          >
            <Heart size={18} fill="currentColor" strokeWidth={0} className="text-rose/70" />
          </motion.div>
        </div>

        <motion.div
          className="letter-seal"
          initial={{ scale: 1, opacity: 1 }}
          animate={
            opening
              ? { scale: [1, 1.18, 0], opacity: [1, 1, 0], y: [-2, -10, -28] }
              : { scale: [1, 1.08, 1] }
          }
          transition={
            opening
              ? { duration: 0.9, ease: 'easeIn' }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <Heart size={22} fill="currentColor" strokeWidth={0} />
        </motion.div>

        <AnimatePresence>
          {opening &&
            BURST.map((heart, index) => (
              <motion.span
                key={`burst-${index}`}
                className="pointer-events-none absolute top-1/2 left-1/2 z-20 text-rose"
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
                animate={{ opacity: 0, x: heart.x, y: heart.y, scale: 1.15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, delay: heart.delay, ease: 'easeOut' }}
                aria-hidden="true"
              >
                <Heart size={heart.size} fill="currentColor" strokeWidth={0} />
              </motion.span>
            ))}
        </AnimatePresence>
      </motion.button>

      <motion.p
        className="mt-7 font-display text-base text-ink"
        animate={opening ? { opacity: 0, y: 8 } : { opacity: 1, y: [0, -4, 0] }}
        transition={
          opening
            ? { duration: 0.35 }
            : { y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }
        }
      >
        Tap to open
      </motion.p>
    </motion.div>
  )
}
