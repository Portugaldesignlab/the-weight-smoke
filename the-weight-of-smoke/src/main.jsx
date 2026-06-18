import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Note: StrictMode is intentionally omitted. Its double-invocation of effects
// in development double-registers GSAP ScrollTriggers and corrupts pinned
// timelines. All effects below clean themselves up via gsap.context().revert().
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
