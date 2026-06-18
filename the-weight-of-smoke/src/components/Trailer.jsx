import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, X, SpeakerSimpleHigh } from '@phosphor-icons/react'
import { FILM, still } from '../data'

gsap.registerPlugin(ScrollTrigger)

// Placeholder teaser footage. Swap this URL for the real master when delivered.
const TEASER_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

export default function Trailer() {
  const root = useRef(null)
  const modal = useRef(null)
  const videoRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.trailer-frame',
        { clipPath: 'inset(14% 14% 14% 14%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!open) return
    const ctx = gsap.context(() => {
      gsap.from(modal.current, { opacity: 0, duration: 0.35, ease: 'power2.out' })
      gsap.from('.modal-inner', {
        scale: 0.92,
        opacity: 0,
        duration: 0.55,
        ease: 'expo.out',
      })
    }, modal)
    videoRef.current?.play?.().catch(() => {})
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      ctx.revert()
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="trailer" ref={root} className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-frame">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="overline">No. 02 — Teaser</span>
            <h2 className="mt-3 font-display text-4xl font-light tracking-tight text-bone md:text-6xl">
              Official Teaser
            </h2>
          </div>
          <div className="hidden text-right md:block">
            <div className="overline text-ash/60">Duration</div>
            <div className="font-mono text-sm tabular-nums text-bone">01:47</div>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="trailer-frame group relative block aspect-video w-full overflow-hidden"
          aria-label="Play the official teaser"
        >
          <img
            src={still('teaser-poster', 1920, 1080)}
            alt="Teaser poster frame: headlights through smoke on a valley road"
            className="grade-deep h-full w-full object-cover transition-transform duration-700 ease-cinema group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-ink/20 transition-colors duration-500 group-hover:bg-ink/10" />

          {/* Play control with concentric ripple */}
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:h-28 md:w-28">
            <span className="absolute inset-0 rounded-full border border-bone/40" />
            <span className="absolute inset-0 animate-ping rounded-full border border-ember/40 [animation-duration:2.6s]" />
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bone text-ink transition-all duration-300 ease-cinema group-hover:bg-ember group-hover:text-ink md:h-16 md:w-16">
              <Play size={22} weight="fill" className="ml-0.5" />
            </span>
          </span>

          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <span className="font-display text-lg italic text-bone/90 md:text-2xl">
              {FILM.tagline}
            </span>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/70 md:inline">
              {FILM.format} · {FILM.year}
            </span>
          </div>
        </button>
      </div>

      {open && (
        <div
          ref={modal}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 px-4 backdrop-blur-sm"
        >
          <div
            className="modal-inner relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="overline flex items-center gap-2 text-bone">
                <SpeakerSimpleHigh size={15} /> Now playing — Teaser
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center text-bone transition-colors hover:text-ember"
                aria-label="Close trailer"
              >
                <X size={22} />
              </button>
            </div>
            <div className="aspect-video w-full overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={TEASER_SRC}
                controls
                playsInline
                className="h-full w-full"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ash">
              Placeholder footage — final teaser embeds here
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
