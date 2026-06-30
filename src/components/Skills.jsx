import { useState } from 'react'

const SKILL_GROUPS = [
  { label: 'Languages', title: 'programming', code: 'LANG', tags: ['C', 'C++', 'Java', 'Haskell', 'JavaScript', 'HTML/CSS'] },
  { label: 'Microcontrollers', title: 'embedded', code: 'MCU', tags: ['Arduino Uno', 'Arduino Nano', 'ESP32', 'STM32', 'Sensors'] },
  { label: 'Hands-on', title: 'fabrication', code: 'FAB', tags: ['Soldering', 'PCB Design', 'Prototyping', '3D Printing', 'Laser Cutting'] },
  { label: 'Design & Tools', title: 'tooling', code: 'TOOL', tags: ['Fusion 360', 'EasyEDA', 'Fritzing', 'PrusaSlicer', 'Illustrator', 'Git'] },
  { label: 'Repair', title: 'electronics', code: 'FIX', tags: ['Phones', 'Tablets', 'Laptops', 'Diagnostics', 'Components'] },
  { label: 'Mindset', title: 'approach', code: 'MIND', tags: ['Hands-on Engineering', 'Problem Solving', 'Adaptability', 'Time Management'] },
]

const SIGNALS = [72, 88, 64, 81, 58, 92]

export default function Skills() {
  const [active, setActive] = useState(0)
  const selected = SKILL_GROUPS[active]

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="skills-console">
          <div className="skills-console-head">
            <div className="window-marks"><i /><i /><i /></div>
            <span className="skills-console-title">SKILLS.DAT</span>
            <span>JL / 004</span>
          </div>

          <div className="skills-matrix" onPointerLeave={() => setActive(0)}>
            {SKILL_GROUPS.map((group, index) => (
              <article
                className={`skill-module skill-module-${index + 1} ${active === index ? 'active' : ''}`}
                key={group.title}
                tabIndex={0}
                onPointerEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <div className="skill-module-top"><span>{group.label}</span><span>{group.code}_0{index + 1}</span></div>
                <h3>{group.title}</h3>
                <div className="skill-tags">{group.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="module-signal"><i style={{ width: `${SIGNALS[index]}%` }} /><span>{SIGNALS[index]}</span></div>
              </article>
            ))}

            <div className="skills-telemetry" style={{ '--active-skill': active }} aria-live="polite">
              <div className="telemetry-copy">
                <span className="cell-index">ACTIVE MODULE / 0{active + 1}</span>
                <strong>{selected.code}</strong>
                <span>{selected.title} interface</span>
              </div>
              <div className="telemetry-field" aria-hidden="true">
                <i className="telemetry-orbit orbit-a" /><i className="telemetry-orbit orbit-b" />
                <i className="telemetry-axis axis-x" /><i className="telemetry-axis axis-y" />
                <b className="telemetry-core" />
                {SIGNALS.map((value, index) => <span key={value} style={{ '--bar': `${value}%`, '--bottom': `${14 + index * 11}%`, '--delay': `${index * 0.08}s` }} />)}
              </div>
            </div>
          </div>

          <div className="skills-console-foot">
            <span>MODULES: 06</span><i /><span>ACTIVE: {selected.code}</span><span>SYNC: OK</span>
          </div>
        </div>
      </div>
    </section>
  )
}
