import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RomanticAtmosphere } from './components/ui/RomanticAtmosphere'
import { LetterIntro } from './components/LetterIntro'
import { Notebook } from './components/Notebook'
import { MusicPlayer, type MusicPlayerHandle } from './components/MusicPlayer'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'

function App() {
  const reduced = usePrefersReducedMotion()
  const [opened, setOpened] = useState(reduced)
  const musicRef = useRef<MusicPlayerHandle>(null)

  const startMusic = useCallback(() => {
    void musicRef.current?.play()
  }, [])

  const finishIntro = useCallback(() => setOpened(true), [])

  return (
    <div className="bg-page relative min-h-dvh overflow-hidden">
      <RomanticAtmosphere />
      <main className="relative z-10">
        <AnimatePresence>
          {!opened && (
            <LetterIntro onOpen={startMusic} onComplete={finishIntro} />
          )}
        </AnimatePresence>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28, scale: 0.92 }}
          animate={
            opened
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 28, scale: 0.92 }
          }
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Notebook />
        </motion.div>
      </main>
      <MusicPlayer ref={musicRef} visible={opened} />
    </div>
  )
}

export default App
