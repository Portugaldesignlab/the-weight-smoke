/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm neo-noir neutrals — no pure black, single ember accent
        ink: '#0b0a08',
        coal: '#121009',
        smoke: '#1c180f',
        ash: '#8c857a',
        fog: '#b8b0a2',
        bone: '#ece5d6',
        ember: '#c2683c',
        emberlow: '#a4542d',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.42em',
      },
      maxWidth: {
        frame: '1480px',
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
