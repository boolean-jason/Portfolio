import { useState } from 'react'

const CATEGORIES = {
  school: {
    code: 'EDU', note: 'Built while learning',
    projects: [
      ['Elevator Control System', 'Q1 / 2023', ['Arduino', 'I2C', 'Embedded'], 'A multi-floor elevator simulation in which every floor runs on its own Arduino Uno. The controllers communicate over I2C to coordinate calls, movement and floor status as one distributed embedded system.'],
      ['ATM Banking System', 'Q3-Q4 / 2023', ['Java', 'GUI', 'Networking'], 'A networked banking application with a user-friendly Java interface and an ATM server. The system handles transactions and account management while supporting communication between different banks.'],
      ['IP-Car', 'Q5-Q6 / 2024', ['Embedded', 'Robotics', 'Accessibility'], 'A remotely operated vehicle designed to give people with mobility impairments a sense of virtual mobility. I worked on sensor integration, live video, remote control and obstacle avoidance for safer navigation.'],
      ['Needle Counting System', 'Q7-Q8 / 2024', ['Computer Vision', 'AI', 'Mechatronics'], 'A physical counting system combining AI-assisted image recognition with a custom shaking tray. The mechanism separates and positions needles so a camera can count them more reliably.'],
      ['Noise Sensor System', 'Nightingale — 2025/26', ['Dashboard', 'Embedded', 'Internship'], 'An environmental noise-monitoring system developed during my internship. I worked across the embedded hardware and internal dashboard, from microcontrollers and MEMS microphones to prototypes and PCB layouts.'],
    ],
  },
  fun: {
    code: 'R&D', note: 'Ideas on the workbench',
    projects: [
      ['Pocket Drone', 'Concept / To build', ['Flight Control', 'Embedded', '3D Printing'], 'A palm-sized drone built from the frame up. The experiment would cover a lightweight custom frame, motor control, sensor fusion and a tunable flight controller—a compact way to learn how stable flight really works.'],
      ['Telegram Idea Printer', 'Concept / To build', ['Telegram Bot', 'IoT', 'Thermal Printer'], 'A personal capture system for thoughts that arrive at inconvenient moments. A Telegram bot forwards each message to a small label printer in my room, turning fleeting ideas into physical notes I can sort, stick up and act on.'],
      ['Bluetooth RF Test Rig', 'Concept / Shielded lab only', ['RF Research', 'Embedded', 'Signal Testing'], 'A controlled experiment for studying Bluetooth resilience and interference on my own devices. It would run at minimal power inside a shielded enclosure, without disrupting public communications.'],
      ['Pocket Hardware Multi-tool', 'Concept / To build', ['RFID', 'Sub-GHz', 'Custom PCB'], 'A from-scratch prototype inspired by the Flipper Zero: a compact playground for learning about RFID, infrared, GPIO and sub-GHz signals, tested only on systems I own or may examine.'],
    ],
  },
  freelance: {
    code: 'CLIENT', note: 'Made for real businesses',
    projects: [
      ['Fietsstar', 'Client website', ['Web Development', 'Responsive', 'Client Work'], 'A clear, responsive website for local bicycle business Fietsstar. It translates the company’s services and personality into an approachable online presence across desktop and mobile.'],
      ['Libraforce', 'Client website', ['Web Development', 'Responsive', 'Client Work'], 'A professional website for Libraforce, shaped around the company’s identity and customer journey. Visitors get a focused route through the business, its services and the next step to make contact.'],
    ],
  },
}

export default function Projects() {
  const [active, setActive] = useState('school')
  const [open, setOpen] = useState(null)
  const category = CATEGORIES[active]
  const selectCategory = (name) => { setActive(name); setOpen(null) }

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">PROJECTS.LOG</span>
          <span className="section-index">JL - ARCHIVE / 003</span>
        </div>
        <div className="project-categories" role="tablist" aria-label="Project categories">
          {Object.entries(CATEGORIES).map(([name, item], index) => (
            <button key={name} id={`category-${name}`} className={`category-tab category-tab--${name} ${active === name ? 'active' : ''}`} type="button" role="tab" aria-selected={active === name} aria-controls={`projects-${name}`} onClick={() => selectCategory(name)}>
              <span className="category-code">{item.code} / 0{index + 1}</span>
              <span className="category-title">{name}</span>
              <span className="category-footer"><span>{item.note}</span><span>{String(item.projects.length).padStart(2, '0')}</span></span>
            </button>
          ))}
        </div>
        <div className={`projects-list projects-list--${active}`} id={`projects-${active}`} role="tabpanel" aria-labelledby={`category-${active}`}>
          <div className="projects-list-header"><span>{active} archive</span><span>{category.projects.length} entries / click to inspect</span></div>
          {category.projects.map(([title, period, tags, desc], index) => {
            const isOpen = open === title
            const toggle = () => setOpen(isOpen ? null : title)
            return (
              <div key={title} className={`project-row ${isOpen ? 'open' : ''}`} onClick={toggle} role="button" tabIndex={0} aria-expanded={isOpen} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle() } }}>
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="project-main"><h3>{title}</h3><div className="project-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                <span className="project-meta">{period}</span>
                <div className="project-detail" aria-hidden={!isOpen}><div className="project-detail-inner">{desc}</div></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
