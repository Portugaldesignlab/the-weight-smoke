import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from '@phosphor-icons/react'
import { FILM } from '../data'

gsap.registerPlugin(ScrollTrigger)

function Laurel({ children }) {
  return (
    <div className="flex items-center gap-3 text-bone/85">
      <Branch className="rotate-0" />
      <div className="text-center leading-tight">{children}</div>
      <Branch className="-scale-x-100" />
    </div>
  )
}

function Branch({ className = '' }) {
  return (
    <svg
      width="26"
      height="48"
      viewBox="0 0 26 48"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M24 2C12 6 6 14 6 24s6 18 18 22"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[8, 16, 24, 32, 40].map((y, i) => (
        <path
          key={i}
          d={`M${7 + i * 0.4} ${y}c-4-1-6-3-7-6`}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

function Stars({ n }) {
  return (
    <span className="flex gap-1 text-ember">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} weight={i < n ? 'fill' : 'regular'} />
      ))}
    </span>
  )
}

export default function Acclaim() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.laurel', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.laurels', start: 'top 82%' },
      })
      gsap.from('.quote-block', {
        opacity: 0,
        y: 36,
        duration: 1,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.quotes', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="border-y border-bone/10 bg-coal px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-frame">
        <span className="overline">No. 05 — Acclaim</span>

        <div className="laurels mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-10 md:justify-between">
          {FILM.laurels.map(([top, bottom]) => (
            <div key={bottom} className="laurel">
              <Laurel>
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ember">
                  {top}
                </div>
                <div className="mt-1 font-display text-sm text-bone">
                  {bottom}
                </div>
              </Laurel>
            </div>
          ))}
        </div>

        <div className="quotes mt-24 grid grid-cols-1 gap-px overflow-hidden border border-bone/10 bg-bone/10 md:grid-cols-3">
          {FILM.acclaim.map((a) => (
            <figure
              key={a.source}
              className="quote-block flex flex-col justify-between gap-10 bg-coal p-8 md:p-10"
            >
              <blockquote className="font-display text-xl font-light italic leading-snug text-bone md:text-2xl">
                “{a.quote}”
              </blockquote>
              <figcaption>
                <Stars n={a.stars} />
                <div className="mt-4 text-sm font-medium text-bone">
                  {a.source}
                </div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ash">
                  {a.outlet}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
