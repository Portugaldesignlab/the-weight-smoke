// Single source of truth for all film content.
// Names, quotes and figures are deliberately specific and organic
// (anti-slop): no "John Doe", no 99.99%, no "Acme".

export const FILM = {
  title: 'The Weight of Smoke',
  titleLines: ['The Weight', 'of Smoke'],
  tagline: 'Everything that burns leaves a residue.',
  year: '1973',
  director: 'Marlowe Adler',
  runtime: '2 H 11 M',
  rating: 'R',
  format: '35MM',
  releaseShort: 'Oct 9, 2026',
  releaseLong: 'In theaters October 9, 2026',
  logline:
    'A retired arson investigator returns to the drought-stricken valley that ruined him, chasing a fire that refuses to behave like an accident — and a daughter who refuses to be found.',
  synopsis: [
    'Thirty-one days without rain. In the brown hills above Calloway Bend, a packing shed goes up at 3 a.m. and takes two men with it.',
    'Elias Renner buried this town years ago. He buried the case that ended his career here too. But the burn pattern in the shed is a signature he has seen exactly once before — and the only witness left alive is the daughter who stopped speaking to him the day the first fire started.',
    'A patient, ash-grey thriller about the things we set alight to keep from freezing, and the people who breathe the smoke for us.',
  ],
  cast: [
    { name: 'Idris Calloway', role: 'Elias Renner', seed: 'renner' },
    { name: 'Noa Vandermeer', role: 'June Renner', seed: 'june' },
    { name: 'Tomas Reynard', role: 'Sheriff Ault', seed: 'ault' },
    { name: 'Selah Marchetti', role: 'Dr. Okonkwo', seed: 'okonkwo' },
    { name: 'Bram Holloway', role: 'The Foreman', seed: 'foreman' },
    { name: 'Yuki Forsberg', role: 'Margaret Renner', seed: 'margaret' },
  ],
  crew: [
    ['Directed by', 'Marlowe Adler'],
    ['Written by', 'Marlowe Adler & Priya Anand'],
    ['Director of Photography', 'Łukasz Berg'],
    ['Original Score', 'Hana Okafor'],
    ['Edited by', 'Devon Castellanos'],
    ['Production Design', 'Ingrid Sølvberg'],
  ],
  stills: [
    { seed: 'shed-fire', caption: 'The packing shed. 3:07 a.m.' },
    { seed: 'valley-dawn', caption: 'Calloway Bend, first light' },
    { seed: 'renner-car', caption: 'The drive back in' },
    { seed: 'june-window', caption: 'June, before the rain' },
    { seed: 'interrogation', caption: 'County office, day nine' },
    { seed: 'ash-field', caption: 'Forty acres, after' },
  ],
  acclaim: [
    {
      quote:
        'Adler shoots fire the way other directors shoot faces. The most patient American thriller in a decade.',
      source: 'Renata Olsson',
      outlet: 'The Reel Quarterly',
      stars: 5,
    },
    {
      quote:
        'Calloway gives the performance of his life with his back to the camera. Devastating, controlled, unforgettable.',
      source: 'Hugo Albani',
      outlet: 'Sightline',
      stars: 5,
    },
    {
      quote:
        'A film that smells of creosote and regret. You leave the theater certain you can taste the smoke.',
      source: 'Mei-Ling Faraday',
      outlet: 'Northwoods Review',
      stars: 4,
    },
  ],
  laurels: [
    ['Official Selection', 'Telluride 2026'],
    ['Grand Jury Prize', 'Deauville'],
    ['Best Cinematography', 'Camerimage'],
  ],
  screenings: [
    { city: 'New York', venue: 'Metrograph', date: 'Oct 09' },
    { city: 'Los Angeles', venue: 'Vista Theater', date: 'Oct 09' },
    { city: 'Chicago', venue: 'Music Box', date: 'Oct 11' },
    { city: 'Austin', venue: 'Paramount', date: 'Oct 16' },
    { city: 'Portland', venue: 'Hollywood Theatre', date: 'Oct 18' },
    { city: 'Toronto', venue: 'TIFF Lightbox', date: 'Oct 23' },
  ],
}

// Reliable placeholder imagery (no Unsplash, per anti-slop rules).
export const still = (seed, w = 1600, h = 900) =>
  `https://picsum.photos/seed/wos-${seed}/${w}/${h}`
