import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Grain from './components/Grain'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Story from './components/Story'
import Marquee from './components/Marquee'
import Trailer from './components/Trailer'
import Cast from './components/Cast'
import Gallery from './components/Gallery'
import Acclaim from './components/Acclaim'
import Screenings from './components/Screenings'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  // Once the preloader lifts, the layout's final height is known — recalc all
  // pinned/scrubbed triggers so the gallery hijack measures correctly.
  useEffect(() => {
    if (ready) ScrollTrigger.refresh()
  }, [ready])

  return (
    <>
      <Grain />
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Nav />
      <main>
        <Hero ready={ready} />
        <Story />
        <Marquee />
        <Trailer />
        <Cast />
        <Gallery />
        <Acclaim />
        <Screenings />
      </main>
      <Footer />
    </>
  )
}
