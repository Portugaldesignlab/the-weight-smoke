import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FILM, still } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Story() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logline words decode from dim to lit as the reader scrolls through.
      gsap.fromTo(
        '.logline .w',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.logline',
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: true,
          },
        },
      )

      gsap.from('.synopsis-p', {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: { trigger: '.synopsis', start: 'top 75%' },
      })

      gsap.fromTo(
        '.story-still img',
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.story-still',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  const words = FILM.logline.split(' ')

  return (
    <section
      id="story"
      ref={root}
      className="relative mx-auto max-w-frame px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mb-14 flex items-center justify-between">
        <span className="overline">No. 01 — The Story</span>
        <span className="overline text-ash/60">{FILM.year}</span>
      </div>

      <p className="logline max-w-[20ch] font-display text-3xl font-light leading-[1.12] tracking-tight text-bone sm:max-w-[24ch] sm:text-4xl md:max-w-[26ch] md:text-6xl">
        {words.map((w, i) => (
          <span key={i} className="w inline-block">
            {w}&nbsp;
          </span>
        ))}
      </p>

      <div className="synopsis mt-24 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div className="story-still relative aspect-[3/4] overflow-hidden md:order-2">
          <img
            src={still('june-window', 1100, 1500)}
            alt="June at a kitchen window before the first fire"
            className="grade h-[124%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          <span className="absolute bottom-5 left-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/80">
            June, before the rain
          </span>
        </div>

        <div className="flex flex-col justify-center gap-7 md:order-1">
          {FILM.synopsis.map((p, i) => (
            <p
              key={i}
              className={`synopsis-p max-w-[58ch] leading-relaxed ${
                i === 0
                  ? 'text-lg text-bone md:text-xl'
                  : 'text-base text-fog'
              }`}
            >
              {p}
            </p>
          ))}
          <div className="hairline mt-4 pt-6">
            <div className="grid grid-cols-2 gap-6">
              {FILM.crew.slice(0, 4).map(([role, name]) => (
                <div key={role}>
                  <div className="overline mb-1 text-ash/60">{role}</div>
                  <div className="text-sm text-bone">{name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
