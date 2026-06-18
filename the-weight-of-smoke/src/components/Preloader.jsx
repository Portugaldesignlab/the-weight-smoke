import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FILM } from '../data'

// Cinematic "leader" preloader: a frame counter races to 100, the title
// strikes, then the whole sheet lifts away like a curtain.
export default function Preloader({ onDone }) {
  const root = useRef(null)
  const countRef = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline({
        onComplete: () => onDone?.(),
      })

      tl.to(counter, {
        v: 100,
        duration: 2.1,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .to('.pl-title', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=1.2')
        .from(
          '.pl-title .pl-word',
          { yPercent: 120, duration: 0.9, ease: 'expo.out', stagger: 0.08 },
          '<',
        )
        .to('.pl-meta', { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
        .to({}, { duration: 0.45 })
        .to('.pl-bar', { scaleX: 0, transformOrigin: 'right', duration: 0.5, ease: 'power2.in' })
        .to(
          root.current,
          { yPercent: -100, duration: 1.0, ease: 'expo.inOut' },
          '-=0.1',
        )
        .set(root.current, { display: 'none' })
    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 md:px-12 md:py-10"
    >
      <div className="flex items-center justify-between">
        <span className="overline">Reel 01 — {FILM.format}</span>
        <span className="overline">{FILM.year}</span>
      </div>

      <div className="pl-title opacity-0 text-center">
        <h1 className="font-display text-5xl font-light leading-[0.9] tracking-tight text-bone md:text-8xl">
          {FILM.titleLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="pl-word inline-block">{line}</span>
            </span>
          ))}
        </h1>
        <p className="pl-meta mt-6 translate-y-3 opacity-0 font-mono text-xs uppercase tracking-ultra text-ember">
          A film by {FILM.director}
        </p>
      </div>

      <div className="flex items-end justify-between">
        <span
          ref={countRef}
          className="font-mono text-xs tabular-nums text-ash"
        >
          {String(count).padStart(3, '0')} / 100
        </span>
        <div className="relative h-px w-2/5 overflow-hidden bg-bone/15">
          <div className="pl-bar absolute inset-0 origin-left bg-ember" />
        </div>
      </div>
    </div>
  )
}
