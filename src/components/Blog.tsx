import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { content } from '../data/content'

interface BlogProps {
  onBack: () => void
}

export function Blog({ onBack }: BlogProps) {
  const { title, date, lede, paragraphs } = content.blog

  return (
    <section className="relative flex min-h-dvh items-center justify-center px-4 py-[max(2rem,env(safe-area-inset-top))] sm:px-6">
      <motion.article
        className="w-[min(92vw,28rem)] rounded-[1.35rem] border-[3px] border-outline bg-paper px-6 py-8 shadow-[5px_5px_0_#3a1f28] sm:px-9 sm:py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-burgundy"
        >
          <ArrowLeft size={16} strokeWidth={2.4} />
          Back to the letter
        </button>

        <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-brown/70">
          {date}
        </p>
        <h1 className="font-display mt-2 text-3xl leading-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="font-poem mt-4 text-lg leading-relaxed text-burgundy">
          {lede}
        </p>

        <div className="mt-6 space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[0.95rem] font-light leading-relaxed text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.article>
    </section>
  )
}
