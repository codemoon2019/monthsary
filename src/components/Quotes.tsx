import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { content } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Section } from './ui/Section'
import { GlassCard } from './ui/GlassCard'

export function Quotes() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const quote = content.quotes[index]

  useEffect(() => {
    if (reduced || content.quotes.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % content.quotes.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [reduced])

  return (
    <Section
      id="quotes"
      title="Favorite Quotes"
      subtitle="Words that feel a little like us."
    >
      <GlassCard className="relative mx-auto min-h-[220px] max-w-2xl overflow-hidden !p-8 md:!p-12">
        <Quote
          className="mb-4 text-blush/40"
          size={28}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={quote.id}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
              “{quote.text}”
            </p>
            {quote.author && (
              <footer className="mt-6 text-sm font-medium tracking-wide text-ink-muted">
                — {quote.author}
              </footer>
            )}
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-2" aria-hidden="true">
          {content.quotes.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-blush' : 'w-1.5 bg-blush-soft'
              }`}
              aria-label={`Show quote ${i + 1}`}
            />
          ))}
        </div>
      </GlassCard>
    </Section>
  )
}
