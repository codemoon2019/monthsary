import { Hero } from './components/Hero'
import { Timeline } from './components/Timeline'
import { Reasons } from './components/Reasons'
import { Gallery } from './components/Gallery'
import { LoveLetter } from './components/LoveLetter'
import { Counter } from './components/Counter'
import { MusicPlayer } from './components/MusicPlayer'
import { Quotes } from './components/Quotes'
import { Surprise } from './components/Surprise'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="bg-page min-h-dvh">
      <a
        href="#timeline"
        className="absolute left-4 top-4 z-50 -translate-y-16 rounded-full bg-white px-4 py-2 text-sm text-ink shadow transition focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush"
      >
        Skip to content
      </a>
      <main>
        <Hero />
        <Timeline />
        <Reasons />
        <Gallery />
        <LoveLetter />
        <Counter />
        <Quotes />
        <Surprise />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  )
}

export default App
