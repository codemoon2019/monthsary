import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { GalleryImage } from '../types/content'

interface LightboxProps {
  image: GalleryImage | null
  onClose: () => void
}

export function Lightbox({ image, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!image) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [image, onClose])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-cream-soft shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full bg-cream/90 p-2 text-ink shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
              aria-label="Close image"
            >
              <X size={20} />
            </button>
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[70vh] w-full object-cover"
            />
            {(image.caption || image.alt) && (
              <div className="px-5 py-4">
                <p className="text-center font-display text-lg text-ink">
                  {image.caption ?? image.alt}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
