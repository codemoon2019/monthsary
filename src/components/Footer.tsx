import { Heart } from 'lucide-react'
import { content } from '../data/content'

export function Footer() {
  return (
    <footer className="px-5 pb-28 pt-8 md:pb-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 border-t border-blush-soft/40 pt-10 text-center">
        <Heart
          size={16}
          className="text-blush"
          fill="currentColor"
          strokeWidth={0}
          aria-hidden="true"
        />
        <p className="font-display text-lg text-ink-muted md:text-xl">
          {content.footer}
        </p>
      </div>
    </footer>
  )
}
