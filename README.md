# Jason Le — Portfolio

A "dark sensory" personal portfolio built with Vite, React, and React Three
Fiber. Black/cream archive aesthetic, custom liquid-metal shader hero,
glassmorphism panels, film-grain overlay, and smooth scroll-based sections.

## Stack

- Vite + React 18
- React Three Fiber + Three.js
- @react-three/drei (Environment, shaderMaterial helper)
- Plain CSS (no framework) — design tokens in `src/index.css`

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  App.jsx               root layout
  main.jsx               entry point
  index.css              design tokens + all styles
  components/
    Nav.jsx               fixed nav + mobile menu
    Hero.jsx              hero section, mounts the 3D canvas
    LiquidHero.jsx        R3F scene: custom GLSL liquid-metal shader blob
    About.jsx             about section
    Projects.jsx          accordion-style project list
    Skills.jsx            skills grid
    Contact.jsx           contact links + footer
```

## Editing content

- Personal info, projects, and skills are plain JS arrays/JSX at the top of
  each component file in `src/components/` — edit directly, no build config
  needed.
- Colors, fonts, and spacing are CSS custom properties at the top of
  `src/index.css` under `:root`.
- The liquid-metal look is a hand-written GLSL shader in `LiquidHero.jsx`
  (`LiquidMetalMaterial`) — tweak `uColorA`/`uColorB`/`uColorRim` there to
  change the blob's palette, or the noise scale/displacement amounts to
  change how "liquid" it looks.

## Notes

- Fonts (Archivo Expanded, Space Grotesk, IBM Plex Mono) are loaded from
  Google Fonts in `index.html` — free, no API key needed.
- Respects `prefers-reduced-motion`.
- Responsive down to small mobile screens.
