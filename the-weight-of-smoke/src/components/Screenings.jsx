import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from '@phosphor-icons/react'
import { FILM, still } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Screenings() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.screen-row', {
        opacity: 0,
        x: -24,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.screen-list', start: 'top 80%' },
      })
      gsap.fromTo(
        '.screen-bg',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="screenings"
      ref={root}
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40"
    >
      <img
        src={still('ash-field', 1800, 1200)}
        alt=""
        aria-hidden
        className="screen-bg grade-deep absolute inset-0 h-[120%] w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="relative mx-auto max-w-frame">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
          <div>
            <span className="overline">No. 06 — In Theaters</span>
            <h2 className="mt-5 font-display text-5xl font-light leading-[0.9] tracking-tight text-bone md:text-7xl">
              See it on
              <br />
              <span className="italic text-ember">{FILM.format}</span>
            </h2>
            <p className="mt-7 max-w-[40ch] leading-relaxed text-fog">
              {FILM.releaseLong}. Opening engagements in six cities, projected
              from film where the houses still can. Select a city to reserve.
            </p>
            <a
              href="#top"
              className="group mt-10 inline-flex items-center gap-3 bg-ember px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-all duration-300 ease-cinema hover:gap-5 active:scale-[0.98]"
            >
              Reserve tickets
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <ul className="screen-list border-t border-bone/10">
            {FILM.screenings.map((s) => (
              <li
                key={s.city}
                className="screen-row group flex items-center justify-between gap-4 border-b border-bone/10 py-6 transition-all duration-500 ease-cinema hover:px-4"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs tabular-nums text-ember">
                    {s.date}
                  </span>
                  <span className="font-display text-2xl text-bone md:text-3xl">
                    {s.city}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ash sm:block">
                    {s.venue}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-fog/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
