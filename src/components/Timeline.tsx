import { motion } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Sunrise,
  Laugh,
  Moon,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { content } from '../data/content'
import type { MemoryIcon } from '../types/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Section } from './ui/Section'
import { GlassCard } from './ui/GlassCard'

const ICONS: Record<MemoryIcon, LucideIcon> = {
  heart: Heart,
  message: MessageCircle,
  sunrise: Sunrise,
  laugh: Laugh,
  moon: Moon,
  sparkles: Sparkles,
}

export function Timeline() {
  const reduced = usePrefersReducedMotion()

  return (
    <Section
      id="timeline"
      title="Our Story"
      subtitle="A small timeline of moments that brought us here."
    >
      <div className="relative mx-auto max-w-2xl">
        <div
          className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blush/40 via-lavender/50 to-blush/30 md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        <ol className="space-y-10">
          {content.memories.map((memory, index) => {
            const Icon = ICONS[memory.icon]
            const isLeft = index % 2 === 0

            return (
              <motion.li
                key={memory.id}
                className={`relative flex md:items-center ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={reduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <span className="absolute h-3 w-3 rounded-full bg-blush shadow-[0_0_0_6px_rgba(255,122,162,0.15)]" />
                </div>

                <div
                  className={`w-full pl-14 md:w-1/2 md:pl-0 ${
                    isLeft ? 'md:pr-10' : 'md:pl-10'
                  }`}
                >
                  <GlassCard className="!p-5 md:!p-6">
                    <div className="mb-3 flex items-center gap-2 text-blush">
                      <Icon size={18} strokeWidth={1.75} />
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                        {memory.date}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-medium text-ink">
                      {memory.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-ink-muted md:text-base">
                      {memory.description}
                    </p>
                  </GlassCard>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
