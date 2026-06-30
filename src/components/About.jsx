import { useRef } from 'react'

const META = [
  ['Based', 'Almere, NL'],
  ['Studying', 'Computer Engineering - RUAS'],
  ['Focus', 'Embedded Systems / Robotics'],
  ['Languages spoken', 'Dutch / English / Vietnamese'],
  ['Currently', 'Repairs @ The Phone Lab'],
  ['Off the clock', 'Gym / Calisthenics / Cars / Music'],
]

export default function About() {
  const graphicRef = useRef(null)

  const trackPointer = (event) => {
    const graphic = graphicRef.current
    if (!graphic) return
    const rect = graphic.getBoundingClientRect()
    graphic.style.setProperty('--gx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    graphic.style.setProperty('--gy', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">ABOUT_ME.SYS</span>
          <span className="section-index">JL - ARCHIVE / 002</span>
        </div>

        <div className="about-layout">
          <div className="about-cell about-intro">
            <span className="cell-index">01 / PROFILE</span>
            <p className="about-text">
              I'm a <strong>Computer Engineering</strong> student at Rotterdam
              University of Applied Sciences - a discipline that sits between
              computer science and electrical engineering. <strong>I'm drawn to hardware</strong>,
              but it's where hardware and software meet - <span className="dim">embedded systems,
              robotics and sensors talking to code</span> - that I feel most at home.
            </p>
          </div>

          <div className="about-cell about-meta-cell">
            <span className="cell-index">02 / SYSTEM DATA</span>
            <div className="about-meta">
              {META.map(([label, value]) => (
                <div className="about-meta-row" key={label}>
                  <span>{label}</span><span>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="about-cell about-graphic"
            ref={graphicRef}
            onPointerMove={trackPointer}
            aria-label="Interactive diagram connecting hardware, code and fabrication"
          >
            <div className="graphic-head">
              <span className="cell-index">03 / SIGNAL MAP</span>
              <span className="graphic-status"><i /> LIVE</span>
            </div>
            <svg className="system-map" viewBox="0 0 520 280" role="img" aria-label="Hardware and software system map">
              <defs>
                <radialGradient id="nodeGlow">
                  <stop offset="0" stopColor="currentColor" stopOpacity=".75" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g className="map-grid">
                <path d="M0 40H520M0 100H520M0 160H520M0 220H520" />
                <path d="M70 0V280M160 0V280M260 0V280M360 0V280M450 0V280" />
              </g>
              <g className="map-paths">
                <path d="M52 198H124V72H212" />
                <path d="M212 72H286V140H372" />
                <path d="M212 72V224H326" />
                <path d="M372 140H466" />
                <path d="M326 224H414V178" />
              </g>
              <g className="map-radar" transform="translate(260 140)">
                <circle r="70" /><circle r="46" /><circle r="22" />
                <path d="M0 0L64 -28A70 70 0 0 1 68 18Z" />
              </g>
              <g className="map-chip" transform="translate(180 42)">
                <rect width="96" height="62" rx="2" />
                <text x="48" y="27" textAnchor="middle">CORE_01</text>
                <text x="48" y="43" textAnchor="middle">MCU / CODE</text>
              </g>
              <g className="map-nodes">
                <circle cx="52" cy="198" r="6" /><circle cx="212" cy="72" r="6" />
                <circle cx="372" cy="140" r="6" /><circle cx="326" cy="224" r="6" />
                <circle cx="466" cy="140" r="6" /><circle cx="414" cy="178" r="6" />
              </g>
              <g className="map-labels">
                <text x="24" y="222">INPUT</text><text x="442" y="126">OUTPUT</text>
                <text x="294" y="248">FABRICATION</text><text x="384" y="164">SENSOR</text>
              </g>
            </svg>
            <div className="graphic-readout"><span>HW ↔ SW</span><span>POINTER / ACTIVE</span></div>
          </div>

          <div className="about-cell about-secondary">
            <span className="cell-index">04 / OFFLINE MODE</span>
            <p className="about-text about-text-secondary">
              I design parts in <strong>Fusion 360</strong> and 3D print what I build.
              Outside engineering, I repair phones, tablets and laptops at The Phone Lab
              and build websites for local businesses. Off the clock I'm into
              <span className="dim"> calisthenics, cars and making music.</span>
            </p>
            <div className="about-microline"><span>BUILD</span><i /><span>REPAIR</span><i /><span>ITERATE</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
