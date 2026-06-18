import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from '@phosphor-icons/react'
import { FILM, still } from '../data'

gsap.registerPlugin(ScrollTrigger)

// Served from /public at the site root. Rename here if your files differ.
const VIDEO_A = '/azetc.mp4'
const VIDEO_B = '/azetec-01.mp4'

// Inward-fading mask: the plate is fully opaque in the centre and dissolves to
// transparent before it reaches any edge, so the footage melts into the ink
// background instead of sitting in a hard rectangle.
const FEATHER =
  'radial-gradient(120% 95% at 50% 42%, #000 38%, rgba(0,0,0,0.65) 66%, transparent 90%)'

const META = [
  ['Runtime', FILM.runtime],
  ['Rated', FILM.rating],
  ['Format', FILM.format],
  ['Release', FILM.releaseShort],
]

export default function Hero({ ready }) {
  const root = useRef(null)
  const videoB = useRef(null)

  // Scroll-driven parallax on the whole video plate (transform/opacity only).
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-plate', {
        yPercent: 12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to('.hero-copy', {
        yPercent: -10,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // Slow, perpetual crossfade between the two clips so both are used as one
  // living background. Isolated tween, opacity-only.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(videoB.current, { opacity: 0 })
      gsap
        .timeline({ repeat: -1 })
        .to(videoB.current, { opacity: 1, duration: 2.6, ease: 'power1.inOut', delay: 5.5 })
        .to(videoB.current, { opacity: 0, duration: 2.6, ease: 'power1.inOut', delay: 5.5 })
    }, root)
    return () => ctx.revert()
  }, [])

  // Intro reveal, fired only after the preloader lifts.
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-plate', { scale: 1.18, opacity: 0, duration: 1.8, ease: 'power2.out' })
        .from('.hero-line .word', { yPercent: 115, duration: 1.2, stagger: 0.12 }, '-=1.4')
        .from('.hero-over', { opacity: 0, y: 18, duration: 0.8 }, '-=0.9')
        .from('.hero-tag', { opacity: 0, y: 18, duration: 0.8 }, '-=0.7')
        .from('.hero-meta-item', { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, '-=0.6')
        .from('.hero-cue', { opacity: 0, duration: 0.8 }, '-=0.4')
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden text-center"
    >
      {/* Animated video plate, feathered inward so edges dissolve into ink */}
      <div
        className="hero-plate absolute inset-0 -z-10"
        style={{ maskImage: FEATHER, WebkitMaskImage: FEATHER }}
      >
        {/* Poster fallback (shows if the videos are missing or still loading) */}
        <img
          src={still('hero-valley', 2000, 1300)}
          alt=""
          aria-hidden
          className="grade-deep absolute inset-0 h-full w-full object-cover"
        />
        <video
          className="grade-deep absolute inset-0 h-full w-full object-cover"
          src={VIDEO_A}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <video
          ref={videoB}
          className="grade-deep absolute inset-0 h-full w-full object-cover"
          src={VIDEO_B}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Tonal wash to keep type legible and unify with the palette */}
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
      </div>

      <div className="hero-copy mx-auto flex w-full max-w-frame flex-col items-center px-6 md:px-10">
        <p className="hero-over overline mb-7 flex items-center gap-4">
          <span className="inline-block h-px w-10 bg-ember" />
          {FILM.year} — A film by {FILM.director}
          <span className="inline-block h-px w-10 bg-ember" />
        </p>

        <h1 className="font-display text-[19vw] font-light leading-[0.82] tracking-tight text-bone sm:text-[15vw] md:text-[13rem]">
          {FILM.titleLines.map((line) => (
            <span key={line} className="hero-line block overflow-hidden">
              <span className="word inline-block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-tag mt-8 max-w-[44ch] font-display text-xl italic text-fog md:text-2xl">
          {FILM.tagline}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-y-5">
          {META.map(([label, value], i) => (
            <div key={label} className="hero-meta-item flex items-center">
              {i !== 0 && (
                <span className="mx-8 hidden h-8 w-px bg-bone/15 md:inline-block md:mx-12" />
              )}
              <div className="px-6 text-center md:px-0">
                <div className="overline mb-1.5 text-ash/70">{label}</div>
                <div className="font-mono text-sm tabular-nums text-bone">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#story"
        className="hero-cue group absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="overline transition-colors group-hover:text-bone">Scroll</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone transition-all duration-300 ease-cinema group-hover:translate-y-1 group-hover:border-ember group-hover:text-ember">
          <ArrowDown size={16} />
        </span>
      </a>
    </section>
  )
}
