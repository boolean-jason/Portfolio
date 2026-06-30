import { Suspense } from 'react'
import LiquidHero from './LiquidHero.jsx'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-canvas-wrap">
        <Suspense fallback={null}>
          <LiquidHero />
        </Suspense>
      </div>

      <div className="hero-content">
        <div className="hero-top-row">
          <span className="eyebrow">JL - ARCHIVE / 001</span>
          <span className="coord">52.3723° N | 5.2177° E&#10;ALMERE_NL&#10;STATUS: ONLINE</span>
        </div>

        <h1 className="hero-name">Jason<br />Huynh Le</h1>

        <div className="hero-role-row">
          <p className="hero-role">
            Embedded Systems &amp; Full-Stack Developer - Computer Engineering
            student building where hardware meets software.
          </p>
          <div className="hero-scroll">
            <span className="hero-scroll-line" />
            scroll
          </div>
        </div>
      </div>
    </header>
  )
}
