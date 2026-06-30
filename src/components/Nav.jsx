import { useState } from 'react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const LAB_LINK = { href: '#/lab', label: 'Lab' }

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="nav">
        <a href="#top" className="nav-logo">JASON HUYNH LE</a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
          <li><a href={LAB_LINK.href} className="nav-link-lab">{LAB_LINK.label}</a></li>
        </ul>
        <button
          className="nav-menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {open && (
        <div className="mobile-menu">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={LAB_LINK.href} onClick={() => setOpen(false)}>{LAB_LINK.label}</a>
        </div>
      )}
    </>
  )
}
