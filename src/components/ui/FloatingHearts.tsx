import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface FloatingHeartsProps {
  count?: number
  className?: string
  dense?: boolean
}

const POSITIONS = [
  { left: '8%', top: '18%', size: 18, delay: 0 },
  { left: '78%', top: '22%', size: 14, delay: 0.4 },
  { left: '18%', top: '68%', size: 12, delay: 0.8 },
  { left: '86%', top: '62%', size: 16, delay: 1.2 },
  { left: '48%', top: '12%', size: 10, delay: 0.6 },
  { left: '62%', top: '78%', size: 13, delay: 1.5 },
  { left: '30%', top: '40%', size: 11, delay: 1.0 },
  { left: '70%', top: '45%', size: 15, delay: 0.2 },
]

export function FloatingHearts({
  count = 6,
  className = '',
  dense = false,
}: FloatingHeartsProps) {
  const reduced = usePrefersReducedMotion()
  const hearts = POSITIONS.slice(0, dense ? POSITIONS.length : count)

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {hearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute text-blush/40"
          style={{ left: heart.left, top: heart.top }}
          initial={{ opacity: 0.35, y: 0 }}
          animate={
            reduced
              ? { opacity: 0.35 }
              : {
                  opacity: [0.25, 0.55, 0.25],
                  y: [0, -14, 0],
                  scale: [1, 1.08, 1],
                }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 4.5 + index * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: heart.delay,
                }
          }
        >
          <Heart
            size={heart.size}
            fill="currentColor"
            strokeWidth={0}
          />
        </motion.div>
      ))}
    </div>
  )
}
