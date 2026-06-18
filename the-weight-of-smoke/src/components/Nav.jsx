import { useEffect, useState } from 'react'
import { Ticket, List, X } from '@phosphor-icons/react'
import { FILM } from '../data'

const LINKS = [
  ['Story', '#story'],
  ['Trailer', '#trailer'],
  ['Cast', '#cast'],
  ['Stills', '#stills'],
  ['Screenings', '#screenings'],
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinema ${
        solid
          ? 'border-b border-bone/10 bg-ink/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-frame items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ember animate-pulseDot" />
          </span>
          <span className="font-display text-lg leading-none tracking-tight text-bone">
            {FILM.title}
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="group relative font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fog transition-colors hover:text-bone"
            >
              {label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ember transition-all duration-300 ease-cinema group-hover:w-full" />
            </a>
          ))}
          <a
            href="#screenings"
            className="group inline-flex items-center gap-2 border border-bone/20 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 ease-cinema hover:border-ember hover:bg-ember hover:text-ink active:scale-[0.97]"
          >
            <Ticket size={15} weight="bold" />
            Tickets
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-bone md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden border-t border-bone/10 bg-ink/95 backdrop-blur-md transition-[max-height] duration-500 ease-cinema md:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="border-b border-bone/5 py-3 font-display text-2xl text-bone"
            >
              {label}
            </a>
          ))}
          <a
            href="#screenings"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 bg-ember px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
          >
            <Ticket size={15} weight="bold" />
            Get Tickets
          </a>
        </div>
      </div>
    </header>
  )
}
