import { motion } from 'framer-motion'
import { content } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Section } from './ui/Section'

export function LoveLetter() {
  const reduced = usePrefersReducedMotion()
  const { greeting, lines, closing, signature } = content.loveLetter

  return (
    <Section
      id="letter"
      title="A Letter for You"
      subtitle="Words I wanted you to read slowly."
    >
      <div className="mx-auto max-w-2xl">
        <div className="paper relative overflow-hidden rounded-[2rem] px-7 py-10 md:px-12 md:py-14">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blush-soft/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-lavender/25 blur-3xl"
            aria-hidden="true"
          />

          <motion.p
            className="font-display text-2xl italic text-ink md:text-3xl"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {greeting}
          </motion.p>

          <div className="mt-8 space-y-5">
            {lines.map((line, index) => (
              <motion.p
                key={index}
                className="text-base font-light leading-relaxed text-ink-muted md:text-lg"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : 0.15 + index * 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="mt-10"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: reduced ? 0 : 0.2 + lines.length * 0.35,
            }}
          >
            <p className="font-display text-xl italic text-ink">{closing}</p>
            <p className="mt-2 font-display text-2xl text-blush">{signature}</p>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
