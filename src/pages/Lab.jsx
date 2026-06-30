import { Suspense, useState } from 'react'
import FieldExperiment from '../components/lab/FieldExperiment.jsx'
import XRayReveal from '../components/lab/XRayReveal.jsx'
import ParticleMorph from '../components/lab/ParticleMorph.jsx'

const MORPH_SHAPES = [
  ['sphere', 'Sphere'],
  ['knot', 'Torus knot'],
  ['helix', 'Helix'],
  ['cube', 'Cube'],
]

export default function Lab() {
  const [morphShape, setMorphShape] = useState('sphere')

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
              A digital playground for real-time 3D, motion and interaction - 
              where I turn curious ideas into responsive visual experiments
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

        <section className="section morph-section" id="morph">
          <div className="container">
            <div className="section-header">
              <span className="eyebrow">MORPH.FIELD</span>
              <span className="section-index">EXP. 003</span>
            </div>
            <div className="lab-canvas-wrap panel-deep morph-lab-wrap">
              <div className="morph-toolbar" aria-label="Choose a particle formation">
                <div className="morph-toolbar-head">
                  <span>FORMATION.SELECT</span>
                  <span>04 AVAILABLE</span>
                </div>
                <div className="morph-options">
                  {MORPH_SHAPES.map(([value, label], index) => (
                    <button
                      key={value}
                      type="button"
                      className={morphShape === value ? 'active' : ''}
                      aria-pressed={morphShape === value}
                      onClick={() => setMorphShape(value)}
                    >
                      <span>0{index + 1}</span>{label}
                    </button>
                  ))}
                </div>
                <div className="morph-toolbar-foot">
                  <span><i /> ACTIVE</span>
                  <span>{morphShape.toUpperCase()}</span>
                </div>
              </div>
              <Suspense fallback={null}>
                <ParticleMorph shape={morphShape} />
              </Suspense>
            </div>
            <p className="lab-caption">
              Choose a formation and move across the field. Every selection
              reshapes the particle cloud while your cursor bends it locally
              with spring physics and a reactive color pulse.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <span>&copy; {new Date().getFullYear()} Jason Huynh Le</span>
        <a href="#/" className="lab-back-btn">&larr; Back to portfolio</a>
      </footer>
    </>
  )
}
