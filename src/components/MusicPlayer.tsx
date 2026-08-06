import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play } from 'lucide-react'
import { content } from '../data/content'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onEnded = () => setPlaying(false)
    const onError = () => {
      setPlaying(false)
      setError(true)
    }

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    try {
      await audio.play()
      setPlaying(true)
      setError(false)
    } catch {
      setError(true)
      setPlaying(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8">
      <audio ref={audioRef} src={content.music.src} preload="none" />
      <motion.div
        className="glass flex items-center gap-3 rounded-full py-2 pl-3 pr-2 shadow-lg"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 pl-1">
          <Music size={16} className="text-blush" aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.span
              key={error ? 'error' : content.music.title}
              className="max-w-[7rem] truncate text-xs font-medium text-ink-muted sm:max-w-[10rem]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {error ? 'Add your song' : content.music.title}
            </motion.span>
          </AnimatePresence>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-blush text-white shadow-[0_8px_20px_rgba(255,122,162,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" className="translate-x-0.5" />
          )}
        </button>
      </motion.div>
    </div>
  )
}
