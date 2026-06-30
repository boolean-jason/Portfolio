import { Suspense } from 'react'
import FieldExperiment from '../components/lab/FieldExperiment.jsx'
import XRayReveal from '../components/lab/XRayReveal.jsx'
import TouchSwarm from '../components/lab/TouchSwarm.jsx'
import ParticleMorph from '../components/lab/ParticleMorph.jsx'

export default function Lab() {
  return (
    <>
      <nav className="nav">
        <a href="#/" className="nav-logo">JASON HUYNH LE</a>
        <ul className="nav-links">
          <a href="#/" className="lab-back-btn">&#8962; Home</a>
        </ul>
      </nav>

      <main className="lab-main">
        <section className="lab-intro">
          <div className="container">
            <span className="eyebrow">LAB.SYS</span>
            <h1 className="lab-title">experiments</h1>
            <p className="lab-sub">
              A space for interactive WebGL pieces outside the main site -
              built with React Three Fiber and custom GLSL shaders.
            </p>
          </div>
        </section>

        <section className="section" id="field">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">FIELD.JS</span>
              <span className="section-index">EXP. 001</span>
            </div>
            <div className="lab-canvas-wrap panel-deep">
              <Suspense fallback={null}>
                <FieldExperiment />
              </Suspense>
            </div>
            <p className="lab-caption">
              An instanced wireframe field that ripples outward from the
              cursor - move your pointer across the canvas.
            </p>
          </div>
        </section>

        <section className="section" id="xray">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">XRAY.LOG</span>
              <span className="section-index">EXP. 002</span>
            </div>
            <div className="lab-canvas-wrap panel-deep">
              <Suspense fallback={null}>
                <XRayReveal />
              </Suspense>
            </div>
            <p className="lab-caption">
              A fluid mouse-trail mask blends a solid liquid-metal surface
              into an x-ray / fresnel-grid look in real time - drag your
              cursor across the form to reveal it.
            </p>
          </div>
        </section>

        <section className="section" id="touch">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">TOUCH.NET</span>
              <span className="section-index">EXP. 003</span>
            </div>
            <div className="lab-canvas-wrap panel-deep">
              <Suspense fallback={null}>
                <TouchSwarm />
              </Suspense>
            </div>
            <p className="lab-caption">
              A particle swarm pulled toward the cursor with spring physics,
              picking up a warm-to-cool color shift the faster it moves -
              inspired by edankwan's touch experiments.
            </p>
          </div>
        </section>

        <section className="section" id="particles">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">PARTICLES.3D</span>
              <span className="section-index">EXP. 004</span>
            </div>
            <div className="lab-canvas-wrap panel-deep">
              <Suspense fallback={null}>
                <ParticleMorph />
              </Suspense>
            </div>
            <p className="lab-caption">
              Three thousand points morphing between a sphere and a torus
              knot, scrubbed by cursor position - inspired by Codrops' 3D
              particle explorations.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <span>&copy; {new Date().getFullYear()} Jason Le</span>
        <a href="#/" className="lab-back-btn">&larr; Back to portfolio</a>
      </footer>
    </>
  )
}
