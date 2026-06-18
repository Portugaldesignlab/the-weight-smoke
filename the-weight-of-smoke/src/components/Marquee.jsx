import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FILM } from '../data'

// Seamless kinetic marquee. The strip is duplicated and translated by exactly
// -50% so the loop has no visible seam. GPU-accelerated (transform only).
export default function Marquee() {
  const track = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(track.current, {
        xPercent: -50,
        ease: 'none',
        duration: 26,
        repeat: -1,
      })
    }, track)
    return () => ctx.revert()
  }, [])

  const unit = (
    <div className="flex shrink-0 items-center">
      {[
        FILM.releaseLong,
        '35MM',
        'Selected — Telluride 2026',
        `A film by ${FILM.director}`,
      ].map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-display text-4xl font-light tracking-tight text-bone md:text-6xl">
            {t}
          </span>
          <span className="text-2xl text-ember md:text-4xl">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="overflow-hidden border-y border-bone/10 bg-coal py-6 md:py-9">
      <div ref={track} className="flex w-max flex-nowrap">
        {unit}
        {unit}
      </div>
    </div>
  )
}
