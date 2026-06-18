import { useState } from 'react'
import {
  InstagramLogo,
  YoutubeLogo,
  XLogo,
  ArrowRight,
  CheckCircle,
  ArrowUp,
} from '@phosphor-icons/react'
import { FILM } from '../data'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error | done

  const submit = (e) => {
    e.preventDefault()
    if (status === 'loading') return
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setStatus('error')
      return
    }
    setStatus('loading')
    // Simulated subscribe — wire to a real list endpoint in production.
    setTimeout(() => setStatus('done'), 1100)
  }

  return (
    <footer className="relative overflow-hidden bg-ink px-6 pb-10 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto max-w-frame">
        {/* Newsletter */}
        <div className="grid grid-cols-1 gap-12 border-b border-bone/10 pb-20 md:grid-cols-[1fr_1fr] md:gap-24">
          <div>
            <span className="overline">The Dispatch</span>
            <h3 className="mt-4 max-w-[16ch] font-display text-3xl font-light leading-tight tracking-tight text-bone md:text-5xl">
              Word from the valley, before anyone else.
            </h3>
          </div>

          <form onSubmit={submit} className="flex flex-col justify-end gap-2">
            <label htmlFor="email" className="overline text-ash/70">
              Email address
            </label>
            {status === 'done' ? (
              <div className="flex items-center gap-3 border-b border-ember py-4 text-bone">
                <CheckCircle size={22} weight="fill" className="text-ember" />
                <span className="text-lg">
                  You&apos;re on the list. Watch for embers.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-b border-bone/25 py-2 transition-colors focus-within:border-ember">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="you@domain.com"
                  className="w-full bg-transparent py-2 text-lg text-bone placeholder:text-ash/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bone text-ink transition-all duration-300 ease-cinema hover:bg-ember active:scale-95 disabled:opacity-60"
                  aria-label="Subscribe"
                >
                  {status === 'loading' ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                  ) : (
                    <ArrowRight size={18} weight="bold" />
                  )}
                </button>
              </div>
            )}
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-[0.15em] ${
                status === 'error' ? 'text-ember' : 'text-ash/60'
              }`}
            >
              {status === 'error'
                ? 'Enter a valid email address.'
                : 'No spoilers. Unsubscribe anytime.'}
            </span>
          </form>
        </div>

        {/* Billing block — the classic poster credit slab, condensed */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-3 border-b border-bone/10 py-12 md:grid-cols-3">
          {FILM.crew.map(([role, name]) => (
            <div
              key={role}
              className="flex items-baseline justify-between gap-4 border-b border-bone/5 pb-2"
            >
              <span className="overline text-ash/60">{role}</span>
              <span className="text-right text-sm text-bone">{name}</span>
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div className="py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[16vw] font-light leading-[0.8] tracking-tight text-bone md:text-[11rem]">
              {FILM.title.split(' ')[0]}
            </h2>
            <div className="flex items-center gap-4">
              {[InstagramLogo, YoutubeLogo, XLogo].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 text-fog transition-all duration-300 ease-cinema hover:border-ember hover:text-ember active:scale-95"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Base bar */}
        <div className="flex flex-col items-start justify-between gap-4 pt-2 md:flex-row md:items-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ash">
            © {FILM.year} Calloway Bend Pictures. {FILM.rating} · {FILM.runtime}
          </p>
          <div className="flex items-center gap-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ash">
            <a href="#top" className="transition-colors hover:text-bone">
              Press Kit
            </a>
            <a href="#top" className="transition-colors hover:text-bone">
              Legal
            </a>
            <a
              href="#top"
              className="group flex items-center gap-2 transition-colors hover:text-bone"
            >
              Top
              <ArrowUp
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
