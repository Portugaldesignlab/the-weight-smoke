import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FILM, still } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Gallery() {
  const root = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop: pin the section and translate vertical scroll into a horizontal
    // pan across the stills (scroll hijack).
    mm.add('(min-width: 768px)', () => {
      const el = track.current
      const distance = () => el.scrollWidth - window.innerWidth

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => '+=' + distance(),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Inner parallax: each still drifts opposite the pan for depth.
      gsap.utils.toArray('.g-img').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.g-panel'),
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })

      return () => tween.kill()
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="stills" className="relative overflow-hidden bg-coal">
      <div
        ref={track}
        className="flex w-full flex-col items-stretch md:h-[100dvh] md:w-max md:flex-row md:flex-nowrap"
      >
        {/* Intro panel */}
        <div className="g-panel flex w-full shrink-0 flex-col justify-center px-6 py-20 md:w-[42vw] md:px-16 md:py-0">
          <span className="overline">No. 04 — Stills</span>
          <h2 className="mt-5 font-display text-5xl font-light leading-[0.92] tracking-tight text-bone md:text-7xl">
            Forty acres,
            <br />
            <span className="italic text-ember">after.</span>
          </h2>
          <p className="mt-6 max-w-[34ch] leading-relaxed text-fog">
            Shot on {FILM.format} across one withering summer. Every frame
            graded by hand to hold the ash in the highlights.
          </p>
          <span className="mt-10 hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ash md:inline">
            Scroll to pan →
          </span>
        </div>

        {/* Still panels */}
        {FILM.stills.map((s, i) => (
          <figure
            key={s.seed}
            className="g-panel group relative w-full shrink-0 overflow-hidden border-t border-bone/5 md:w-[46vw] md:border-l md:border-t-0"
          >
            <div className="h-[72vw] overflow-hidden md:h-full">
              <img
                src={still(s.seed, 1400, 1600)}
                alt={s.caption}
                className="g-img grade h-full w-[118%] object-cover"
              />
            </div>
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/85">
                {s.caption}
              </span>
              <span className="font-mono text-[0.65rem] tabular-nums text-ember">
                {String(i + 1).padStart(2, '0')} / {String(FILM.stills.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
