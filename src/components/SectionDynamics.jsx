import { useEffect } from 'react'

export default function SectionDynamics() {
  useEffect(() => {
    document.documentElement.classList.add('dynamics-ready')
    const sections = [...document.querySelectorAll('main .section')]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('section-visible')
      })
    }, { threshold: reducedMotion ? 0 : 0.12 })

    const cleanups = sections.map((section) => {
      observer.observe(section)
      const track = (event) => {
        const rect = section.getBoundingClientRect()
        section.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
        section.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
      }
      section.addEventListener('pointermove', track, { passive: true })
      return () => section.removeEventListener('pointermove', track)
    })

    return () => {
      observer.disconnect()
      cleanups.forEach((cleanup) => cleanup())
      document.documentElement.classList.remove('dynamics-ready')
    }
  }, [])

  return null
}
