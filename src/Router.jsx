import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Lab from './pages/Lab.jsx'

function getRoute() {
  return window.location.hash.startsWith('#/lab') ? 'lab' : 'home'
}

export default function Router() {
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = getRoute()
      setRoute((currentRoute) => {
        if (currentRoute !== nextRoute) {
          requestAnimationFrame(() => window.scrollTo(0, 0))
        }
        return nextRoute
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route === 'lab' ? <Lab /> : <Home />
}
