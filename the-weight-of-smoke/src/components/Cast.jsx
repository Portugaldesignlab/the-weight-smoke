import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FILM, still } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Cast() {
  const root = useRef(null)
  const preview = useRef(null)
  const moveX = useRef(null)
  const moveY = useRef(null)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quick setters keep the floating portrait off the React render cycle.
      moveX.current = gsap.quickTo(preview.current, 'x', {
        duration: 0.5,
        ease: 'power3',
      })
      moveY.current = gsap.quickTo(preview.current, 'y', {
        duration: 0.5,
        ease: 'power3',
      })

      gsap.from('.cast-row', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: '.cast-list', start: 'top 78%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const onMove = (e) => {
    const rect = root.current.getBoundingClientRect()
    moveX.current?.(e.clientX - rect.left)
    moveY.current?.(e.clientY - rect.top)
  }

  return (
    <section
      id="cast"
      ref={root}
      onMouseMove={onMove}
      className="relative mx-auto max-w-frame px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mb-14 flex items-end justify-between">
        <div>
          <span className="overline">No. 03 — Ensemble</span>
          <h2 className="mt-4 max-w-[14ch] font-display text-4xl font-light leading-[0.95] tracking-tight text-bone md:text-7xl">
            The faces in the smoke
          </h2>
        </div>
        <span className="hidden font-mono text-xs text-ash/60 md:block">
          {String(FILM.cast.length).padStart(2, '0')} Players
        </span>
      </div>

      {/* Floating portrait preview (desktop) */}
      <div
        ref={preview}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-72 w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden md:block"
        style={{ opacity: active === null ? 0 : 1, transition: 'opacity 0.4s' }}
      >
        {FILM.cast.map((c, i) => (
          <img
            key={c.seed}
            src={still(c.seed, 600, 760)}
            alt={c.name}
            className="grade absolute inset-0 h-full w-full object-cover"
            style={{ opacity: active === i ? 1 : 0, transition: 'opacity 0.3s' }}
          />
        ))}
      </div>

      {/* Editorial list (desktop) */}
      <ul className="cast-list hidden border-t border-bone/10 md:block">
        {FILM.cast.map((c, i) => (
          <li
            key={c.seed}
            className="cast-row group border-b border-bone/10"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="flex items-baseline justify-between py-7 transition-all duration-500 ease-cinema group-hover:px-6">
              <span className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-ash/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-display text-4xl font-light tracking-tight transition-colors duration-300 lg:text-6xl ${
                    active === i ? 'text-bone' : 'text-fog/60'
                  }`}
                >
                  {c.name}
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                {c.role}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Portrait grid (mobile) — zig-zag offset, not equal cards */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:hidden">
        {FILM.cast.map((c, i) => (
          <div key={c.seed} className={i % 2 === 1 ? 'mt-8' : ''}>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={still(c.seed, 600, 800)}
                alt={c.name}
                className="grade h-full w-full object-cover"
              />
            </div>
            <div className="mt-3">
              <div className="font-display text-xl text-bone">{c.name}</div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-ember">
                {c.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
