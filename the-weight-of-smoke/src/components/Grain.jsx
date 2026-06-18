import { memo } from 'react'

// Fixed, pointer-events-none film grain + vignette + scanline warmth.
// Isolated and memoized so it never participates in scroll repaints.
function Grain() {
  return (
    <>
      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.10] mix-blend-overlay flicker"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[59] mix-blend-multiply"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 38%, transparent 52%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </>
  )
}

export default memo(Grain)
