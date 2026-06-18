# The Weight of Smoke — Official Film Site

A high-end cinematic landing site for the (fictional) neo-noir feature
**_The Weight of Smoke_**. Built with React + Vite + Tailwind, with GSAP
ScrollTrigger driving the scrolltelling. Art direction follows the
[taste-skill](https://github.com/Leonxlnx/taste-skill) anti-slop ruleset.

## Run it

```bash
npm install
npm run dev      # local dev server (Vite prints the URL)
npm run build    # production build to /dist
npm run preview  # preview the production build
```

Requires Node 18+.

## What's inside

| Section | Technique |
| --- | --- |
| Preloader | Frame-counter "leader" + curtain lift (GSAP timeline) |
| Hero | `min-h-[100dvh]`, masked title reveal, scroll parallax plate |
| Story | Scroll-decoded logline (dim → lit), parallax still |
| Marquee | Seamless kinetic type band |
| Trailer | Clip-path reveal, morphing modal player |
| Cast | Cursor-tracked floating portrait (editorial list) |
| Stills | Horizontal scroll hijack with pinned panels + inner parallax |
| Acclaim | Hand-drawn SVG laurels, hairline-divided quote grid |
| Screenings | Parallax plate, city/venue reservation list |
| Footer | Newsletter (idle/loading/error/done states), billing block |

## Design system

- **Type** — Fraunces (cinematic display serif) + Satoshi (UI sans) +
  JetBrains Mono (data). No Inter.
- **Palette** — warm neo-noir neutrals on off-black (`#0b0a08`), a single
  desaturated ember accent (`#c2683c`). No purple, no neon glows, no pure black.
- **Imagery** — `picsum.photos` placeholders under a uniform CSS color grade so
  the site reads as one graded film. Swap the `still()` helper in
  `src/data.js` for the real production stills.
- **Motion** — transform/opacity only; perpetual loops isolated; all GSAP
  contexts self-clean via `gsap.context().revert()`. Respects
  `prefers-reduced-motion`.

## Swapping in real content

All copy, cast, crew, quotes, screenings and image seeds live in
`src/data.js`. The teaser modal URL is the `TEASER_SRC` constant in
`src/components/Trailer.jsx` (currently sample footage).
