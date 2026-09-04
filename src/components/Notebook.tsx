import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { content } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface NotebookPage {
  id: string
  kind: 'cover' | 'stanza' | 'closing' | 'moment'
  lines?: string[]
}

const FLIP = {
  duration: 0.75,
  ease: [0.45, 0.05, 0.2, 1] as [number, number, number, number],
}

function CoverFace({ active }: { active: boolean }) {
  const items = [
    content.monthsaryDateLabel,
    content.dedication,
    content.poem.title,
    'Swipe or tap',
  ]

  return (
    <div className="flex h-full flex-col px-8 py-8 text-center sm:px-11 sm:py-10">
      <motion.p
        className="text-[0.68rem] font-medium uppercase tracking-[0.38em] text-brown/70"
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, delay: active ? 0.55 : 0 }}
      >
        {items[0]}
      </motion.p>
      <div className="flex flex-1 flex-col items-center justify-center">
        <motion.p
          className="font-display text-[1.85rem] font-medium leading-tight text-ink sm:text-4xl"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.9, delay: active ? 0.8 : 0 }}
        >
          {items[1]}
        </motion.p>
        <motion.p
          lang="fil"
          className="font-poem mt-6 max-w-[16rem] text-lg leading-snug text-burgundy/90 sm:max-w-xs sm:text-xl"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: active ? 1.1 : 0 }}
        >
          {items[2]}
        </motion.p>
      </div>
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={false}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: active ? 1.5 : 0 }}
      >
        <p className="font-display text-sm text-brown/70">{items[3]}</p>
        <motion.span
          className="text-rose"
          animate={active ? { x: [0, 6, 0] } : { x: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ChevronRight size={18} strokeWidth={2.6} />
        </motion.span>
      </motion.div>
    </div>
  )
}

function StanzaFace({ lines, active }: { lines: string[]; active: boolean }) {
  return (
    <div className="flex h-full items-center justify-center px-8 sm:px-10">
      <p
        lang="fil"
        className="font-poem max-w-[17.5rem] text-center text-[1.2rem] leading-[1.85] text-ink sm:max-w-sm sm:text-[1.4rem]"
      >
        {lines.map((line, index) => (
          <motion.span
            key={line}
            className="block"
            initial={false}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration: 0.75,
              delay: active ? 0.6 + index * 0.16 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        ))}
      </p>
    </div>
  )
}

function PageTurnBurst({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <motion.span
          key={index}
          className="absolute top-1/2 left-[8%] text-rose"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 1, 0],
            x: 40 + (index % 4) * 28,
            y: -30 + index * 10 - 20,
            scale: [0.4, 1, 0.7],
          }}
          transition={{ duration: 1.2, delay: index * 0.06, ease: 'easeOut' }}
        >
          <Heart size={10 + (index % 3) * 2} fill="currentColor" strokeWidth={0} />
        </motion.span>
      ))}
    </div>
  )
}

const FLOATING_HEARTS = [
  { x: -28, drift: -18, delay: 1.45, size: 11, duration: 3.2 },
  { x: 2, drift: 8, delay: 1.65, size: 14, duration: 3.5 },
  { x: 26, drift: 16, delay: 1.85, size: 10, duration: 3.1 },
  { x: -10, drift: -8, delay: 2.1, size: 8, duration: 3.6 },
  { x: 16, drift: 12, delay: 2.3, size: 9, duration: 3.3 },
]

const SPARKLES = [
  { left: '12%', top: '22%', delay: 1.7, size: 5 },
  { left: '78%', top: '18%', delay: 2.0, size: 4 },
  { left: '84%', top: '58%', delay: 2.2, size: 5 },
  { left: '18%', top: '64%', delay: 2.4, size: 3 },
]

function ClosingFace({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion()
  const play = active && !reduced

  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="relative h-40 w-40">
        <motion.div
          className="absolute inset-8 rounded-full border-[3px] border-outline bg-blush"
          animate={
            play
              ? { opacity: [0.7, 1, 0.7], scale: [0.9, 1.08, 0.9] }
              : { opacity: 0.7 }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center text-burgundy"
          initial={play ? { opacity: 0, scale: 0.35 } : false}
          animate={
            play
              ? { opacity: 1, scale: [1, 1.1, 1], y: [0, -3, 0] }
              : { opacity: 1, scale: 1 }
          }
          transition={
            play
              ? {
                  opacity: { duration: 0.5 },
                  scale: { duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
                  y: { duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
                }
              : { duration: 0 }
          }
        >
          <Heart size={68} fill="currentColor" strokeWidth={0} />
        </motion.div>

        <AnimatePresence>
          {play && (
            <motion.span
              key="kiss"
              className="absolute top-[38%] left-[54%] text-[1.85rem] drop-shadow-sm"
              initial={{ opacity: 0, x: -46, y: 42, scale: 0.35, rotate: -28 }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: [0.35, 1.18, 1],
                rotate: [-28, 14, 8],
              }}
              transition={{
                delay: 0.75,
                duration: 0.95,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-hidden="true"
            >
              💋
            </motion.span>
          )}
        </AnimatePresence>

        {play &&
          FLOATING_HEARTS.map((heart, index) => (
            <motion.span
              key={`float-${index}`}
              className="absolute top-1/2 left-1/2 text-rose"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 0.95, 0],
                x: [heart.x * 0.2, heart.x + heart.drift],
                y: [8, -58],
                scale: [0.4, 1, 0.7],
                rotate: [-8, 10],
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: 'easeOut',
              }}
              aria-hidden="true"
            >
              <Heart size={heart.size} fill="currentColor" strokeWidth={0} />
            </motion.span>
          ))}

        {play &&
          SPARKLES.map((sparkle, index) => (
            <motion.span
              key={`sparkle-${index}`}
              className="absolute rounded-full bg-dust"
              style={{ left: sparkle.left, top: sparkle.top, width: sparkle.size, height: sparkle.size }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
              transition={{
                duration: 1.8,
                delay: sparkle.delay,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
          ))}
      </div>

      <motion.p
        className="font-poem mt-1 whitespace-pre-line text-[1.85rem] leading-snug text-ink sm:text-3xl"
        initial={play ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: play ? 1.85 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {content.closing.signature}
      </motion.p>
      <motion.span
        className="mt-3 block h-[3px] w-14 origin-center rounded-full bg-outline"
        initial={play ? { scaleX: 0, opacity: 0 } : false}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: play ? 2.35 : 0 }}
        aria-hidden="true"
      />
    </div>
  )
}

function MomentFace({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion()
  const showGif = active && !reduced

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center sm:px-8">
      <motion.div
        className="flex aspect-square w-full max-w-[15.5rem] items-center justify-center overflow-hidden rounded-2xl border-[3px] border-outline bg-blush shadow-[3px_3px_0_#3a1f28] sm:max-w-[17.5rem]"
        initial={false}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.55, scale: 0.96 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {showGif ? (
          <img
            src={content.moment.gifSrc}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-burgundy/45" aria-hidden="true">
            <Heart size={52} fill="currentColor" strokeWidth={0} />
          </div>
        )}
      </motion.div>

      <motion.div
        className="mt-3 flex flex-col items-center gap-2"
        initial={false}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.7, delay: active ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-poem max-w-[16rem] text-lg leading-snug text-ink sm:text-xl">
          {content.moment.caption}
        </p>
        <div className="flex items-center gap-2 text-burgundy" aria-hidden="true">
          <Heart size={18} fill="currentColor" strokeWidth={0} className="text-rose" />
        </div>
      </motion.div>
    </div>
  )
}

function PageFace({ page, active }: { page: NotebookPage; active: boolean }) {
  if (page.kind === 'cover') return <CoverFace active={active} />
  if (page.kind === 'closing') return <ClosingFace active={active} />
  if (page.kind === 'moment') return <MomentFace active={active} />
  return <StanzaFace lines={page.lines ?? []} active={active} />
}

export function Notebook({ onOpenBlog }: { onOpenBlog: () => void }) {
  const reduced = usePrefersReducedMotion()
  const pages = useMemo<NotebookPage[]>(
    () => [
      { id: 'cover', kind: 'cover' },
      ...content.poem.stanzas.map((stanza, index) => ({
        id: `stanza-${index}`,
        kind: 'stanza' as const,
        lines: stanza.lines,
      })),
      { id: 'closing', kind: 'closing' },
      { id: 'moment', kind: 'moment' },
    ],
    [],
  )

  const last = pages.length - 1
  const [current, setCurrent] = useState(0)
  const [turning, setTurning] = useState(false)
  const startX = useRef<number | null>(null)
  const turningPage = useRef<number | null>(null)

  const goTo = useCallback(
    (to: number) => {
      if (to < 0 || to > last || to === current || turning) return
      if (reduced) {
        setCurrent(to)
        return
      }
      turningPage.current = to > current ? current : to
      setTurning(true)
      setCurrent(to)
    },
    [current, last, reduced, turning],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') goTo(current + 1)
      if (event.key === 'ArrowLeft') goTo(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (startX.current == null || turning) {
      startX.current = null
      return
    }

    const dx = event.clientX - startX.current
    startX.current = null

    if (dx <= -48) {
      goTo(current + 1)
      return
    }
    if (dx >= 48) {
      goTo(current - 1)
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    if (x < rect.width * 0.42) goTo(current - 1)
    else goTo(current + 1)
  }

  return (
    <section
      className="relative flex min-h-dvh flex-col items-center justify-center px-3 py-[max(1.5rem,env(safe-area-inset-top))] sm:px-6"
      aria-label={content.poem.title}
    >
      <div className="relative w-[min(92vw,26rem)]">
        <div
          className="notebook-stage relative w-full touch-none select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          role="group"
          aria-roledescription="notebook"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[18%] bg-gradient-to-r from-rose/20 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[18%] bg-gradient-to-l from-rose/25 to-transparent"
            aria-hidden="true"
          />
          <PageTurnBurst show={turning} />
          {pages.map((page, index) => {
            const turned = index < current
            return (
              <motion.div
                key={page.id}
                className="notebook-leaf"
                initial={false}
                animate={{ rotateY: turned ? -180 : 0 }}
                transition={reduced ? { duration: 0 } : FLIP}
                onAnimationComplete={() => {
                  if (turningPage.current === index) {
                    turningPage.current = null
                    setTurning(false)
                  }
                }}
                style={{
                  zIndex: turned ? index : pages.length - index,
                }}
              >
                <div className="notebook-face notebook-face-front">
                  <div className="notebook-binding" aria-hidden="true" />
                  <PageFace page={page} active={index === current && !turned} />
                </div>
                <div className="notebook-face notebook-face-back" aria-hidden="true">
                  <div className="notebook-binding" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="relative z-10 mt-6 flex flex-col items-center gap-3 sm:mt-8">
        <div className="flex items-center gap-5">
          <motion.button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 0 || turning}
            className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-outline bg-paper text-burgundy shadow-[3px_3px_0_#3a1f28] transition-opacity disabled:opacity-25"
            aria-label="Previous page"
            whileTap={current === 0 || turning ? undefined : { scale: 0.9 }}
          >
            <ChevronLeft size={26} strokeWidth={2.6} />
          </motion.button>
          <div className="flex min-w-[4.5rem] flex-col items-center gap-1.5">
            <p className="text-center font-display text-sm text-ink">
              {current + 1} / {pages.length}
            </p>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {pages.map((page, index) => (
                <span
                  key={page.id}
                  className={`h-2 rounded-full border-2 border-outline transition-all ${
                    index === current ? 'w-5 bg-rose' : 'w-2 bg-paper'
                  }`}
                />
              ))}
            </div>
          </div>
          <motion.button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === last || turning}
            className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-outline bg-rose text-paper shadow-[3px_3px_0_#3a1f28] transition-opacity disabled:opacity-25"
            aria-label="Next page"
            whileTap={current === last || turning ? undefined : { scale: 0.9 }}
          >
            <Heart size={18} fill="currentColor" strokeWidth={0} className="absolute opacity-30" />
            <ChevronRight size={26} strokeWidth={2.6} />
          </motion.button>
        </div>
        <button
          type="button"
          onClick={onOpenBlog}
          className="font-display text-sm text-burgundy underline decoration-rose/50 underline-offset-4"
        >
          Read: The AI Age
        </button>
      </div>
    </section>
  )
}
