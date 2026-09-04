import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { content } from '../data/content'

export interface MusicPlayerHandle {
  play: () => Promise<void>
}

interface MusicPlayerProps {
  visible?: boolean
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  function MusicPlayer({ visible = true }, ref) {
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

    const play = async () => {
      const audio = audioRef.current
      if (!audio) return
      try {
        await audio.play()
        setPlaying(true)
        setError(false)
      } catch {
        setError(true)
        setPlaying(false)
      }
    }

    useImperativeHandle(ref, () => ({ play }))

    if (!content.music.src) return null

    const toggle = async () => {
      const audio = audioRef.current
      if (!audio) return

      if (playing) {
        audio.pause()
        setPlaying(false)
        return
      }

      await play()
    }

    return (
      <div className="fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-40 md:top-8 md:right-8">
        <audio ref={audioRef} src={content.music.src} preload="auto" loop />
        <AnimatePresence>
          {visible && (
            <motion.button
              type="button"
              onClick={() => void toggle()}
              className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-outline bg-rose text-paper shadow-[3px_3px_0_#3a1f28] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outline"
              aria-label={error ? 'Play music' : playing ? 'Pause music' : 'Play music'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              whileTap={{ scale: 0.92 }}
            >
              <motion.span
                className="flex"
                animate={playing ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={
                  playing
                    ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.2 }
                }
              >
                {playing ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" className="translate-x-0.5" />
                )}
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
