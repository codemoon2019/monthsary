import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkle } from 'lucide-react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const CLOUDS = [
  { top: '6%', size: 168, duration: 28, delay: 0, reverse: false },
  { top: '16%', size: 142, duration: 34, delay: 6, reverse: true },
  { top: '70%', size: 156, duration: 31, delay: 3, reverse: false },
  { top: '58%', size: 128, duration: 36, delay: 10, reverse: true },
]

const STARS = [
  { left: '18%', top: '22%', size: 16, delay: 0 },
  { left: '86%', top: '28%', size: 13, delay: 0.6 },
  { left: '48%', top: '8%', size: 11, delay: 1.1 },
]

const RAIN = [
  { left: '4%', delay: 0, duration: 12, sway: 22, size: 14, rotate: 12 },
  { left: '11%', delay: 1.2, duration: 14, sway: -18, size: 11, rotate: -16 },
  { left: '18%', delay: 3.4, duration: 11, sway: 26, size: 16, rotate: 8 },
  { left: '26%', delay: 0.6, duration: 16, sway: -24, size: 12, rotate: -10 },
  { left: '33%', delay: 5.1, duration: 13, sway: 16, size: 15, rotate: 18 },
  { left: '40%', delay: 2.2, duration: 15, sway: -20, size: 10, rotate: -8 },
  { left: '47%', delay: 7.4, duration: 12, sway: 28, size: 17, rotate: 14 },
  { left: '54%', delay: 1.8, duration: 17, sway: -14, size: 13, rotate: -20 },
  { left: '61%', delay: 4.6, duration: 11, sway: 20, size: 12, rotate: 6 },
  { left: '68%', delay: 0.3, duration: 14, sway: -26, size: 15, rotate: -12 },
  { left: '75%', delay: 6.2, duration: 13, sway: 18, size: 11, rotate: 10 },
  { left: '82%', delay: 2.8, duration: 16, sway: -16, size: 16, rotate: -6 },
  { left: '89%', delay: 8.1, duration: 12, sway: 24, size: 13, rotate: 16 },
  { left: '15%', delay: 9.4, duration: 15, sway: -22, size: 10, rotate: -14 },
  { left: '58%', delay: 10.2, duration: 14, sway: 12, size: 14, rotate: 4 },
  { left: '93%', delay: 3.9, duration: 18, sway: -10, size: 12, rotate: -18 },
]

const FLOATING = [
  { left: '12%', top: '32%', size: 14, delay: 0.4 },
  { left: '88%', top: '24%', size: 12, delay: 1.6 },
]

function Cloud({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.68}
      viewBox="0 0 160 110"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M38 86c-16 0-26-12-24-26-10-4-10-20 4-24 4-16 26-24 40-10 12-16 40-14 48 6 16-2 28 12 22 24 10 6 8 22-8 26-6 12-28 16-42 8-10 8-28 8-40-4z"
        fill="#3A1F28"
        transform="translate(4 5)"
      />
      <path
        d="M38 86c-16 0-26-12-24-26-10-4-10-20 4-24 4-16 26-24 40-10 12-16 40-14 48 6 16-2 28 12 22 24 10 6 8 22-8 26-6 12-28 16-42 8-10 8-28 8-40-4z"
        fill="#FFF6E8"
        stroke="#3A1F28"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <ellipse cx="48" cy="40" rx="14" ry="7" fill="#FFFFFF" opacity="0.7" />
      <circle cx="62" cy="62" r="4.2" fill="#3A1F28" />
      <circle cx="88" cy="62" r="4.2" fill="#3A1F28" />
      <circle cx="63.4" cy="60.8" r="1.3" fill="#FFF6E8" />
      <circle cx="89.4" cy="60.8" r="1.3" fill="#FFF6E8" />
      <ellipse cx="52" cy="72" rx="6" ry="3.2" fill="#FF9BB0" />
      <ellipse cx="98" cy="72" rx="6" ry="3.2" fill="#FF9BB0" />
      <path
        d="M70 74c4 6 16 6 20 0"
        stroke="#3A1F28"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function RomanticAtmosphere() {
  const reduced = usePrefersReducedMotion()
  const [compact, setCompact] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)').matches : true,
  )

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)')
    const onChange = () => setCompact(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const clouds = compact ? CLOUDS.slice(0, 3) : CLOUDS
  const rain = compact ? RAIN.slice(0, 12) : RAIN

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {clouds.map((cloud, index) => (
        <motion.span
          key={`cloud-${index}`}
          className="absolute"
          style={{ top: cloud.top, left: 0 }}
          initial={false}
          animate={
            reduced
              ? { x: '30vw' }
              : cloud.reverse
                ? { x: ['110vw', '-25vw'] }
                : { x: ['-25vw', '110vw'] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: cloud.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: cloud.delay,
                }
          }
        >
          <Cloud size={cloud.size} />
        </motion.span>
      ))}

      {STARS.map((star, index) => (
        <motion.span
          key={`star-${index}`}
          className="absolute text-rose"
          style={{ left: star.left, top: star.top }}
          animate={
            reduced
              ? { opacity: 0.8 }
              : { opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8], rotate: [0, 16, 0] }
          }
          transition={{
            duration: 2.4 + index * 0.25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        >
          <Sparkle size={star.size} fill="#FFF1C9" strokeWidth={2.2} />
        </motion.span>
      ))}

      {!reduced &&
        rain.map((drop, index) => (
          <motion.span
            key={`rain-${index}`}
            className="absolute text-rose"
            style={{ left: drop.left, top: '-8%' }}
            animate={{
              y: ['0vh', '115vh'],
              x: [0, drop.sway, -drop.sway * 0.5, drop.sway * 0.25],
              rotate: [drop.rotate, drop.rotate + 70, drop.rotate + 140],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: drop.delay,
            }}
          >
            <Heart size={drop.size} fill="#F26B8A" stroke="#3A1F28" strokeWidth={2} />
          </motion.span>
        ))}

      {FLOATING.map((heart, index) => (
        <motion.span
          key={`float-${index}`}
          className="absolute text-rose"
          style={{ left: heart.left, top: heart.top }}
          animate={
            reduced
              ? { opacity: 0.7 }
              : {
                  opacity: [0.45, 1, 0.45],
                  y: [0, -12, 0],
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 4.5 + index,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: heart.delay,
          }}
        >
          <Heart size={heart.size} fill="#F26B8A" stroke="#3A1F28" strokeWidth={2.2} />
        </motion.span>
      ))}
    </div>
  )
}
