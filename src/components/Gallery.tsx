import { useState } from 'react'
import { motion } from 'framer-motion'
import { content } from '../data/content'
import type { GalleryImage } from '../types/content'
import { Section } from './ui/Section'
import { Lightbox } from './Lightbox'

export function Gallery() {
  const [active, setActive] = useState<GalleryImage | null>(null)

  return (
    <>
      <Section
        id="gallery"
        title="Our Gallery"
        subtitle="A few frames from our story. Replace these with your photos anytime."
      >
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {content.gallery.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
              onClick={() => setActive(image)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: (index % 3) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.015 }}
              aria-label={`Open ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                width={800}
                height={1000}
                className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </motion.button>
          ))}
        </div>
      </Section>

      <Lightbox image={active} onClose={() => setActive(null)} />
    </>
  )
}
