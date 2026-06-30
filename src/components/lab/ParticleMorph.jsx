import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

/* A field of points that morphs between two formations - a sphere and a
   torus knot - driven by pointer position, with a slow auto-rotate. */

const COUNT = 3000

function sampleSphere(i, total) {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / total)
  const theta = Math.PI * (1 + Math.sqrt(5)) * i
  const r = 1.9
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ]
}

function sampleKnot(i, total) {
  const t = (i / total) * Math.PI * 2
  const p = 2
  const q = 3
  const cx = (2 + Math.cos(q * t)) * Math.cos(p * t)
  const cy = (2 + Math.cos(q * t)) * Math.sin(p * t)
  const cz = Math.sin(q * t)
  return [cx * 0.85, cy * 0.85, cz * 0.85]
}

function MorphField() {
  const pointsRef = useRef()
  const progress = useRef(0)
  const targetProgress = useRef(0)

  const { positions, sphere, knot, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sphere = new Float32Array(COUNT * 3)
    const knot = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const [sx, sy, sz] = sampleSphere(i, COUNT)
      const [kx, ky, kz] = sampleKnot(i, COUNT)
      sphere[i * 3] = sx
      sphere[i * 3 + 1] = sy
      sphere[i * 3 + 2] = sz
      knot[i * 3] = kx
      knot[i * 3 + 1] = ky
      knot[i * 3 + 2] = kz
      positions[i * 3] = sx
      positions[i * 3 + 1] = sy
      positions[i * 3 + 2] = sz

      const tone = 0.82 + Math.random() * 0.13
      colors[i * 3] = tone
      colors[i * 3 + 1] = tone * 0.98
      colors[i * 3 + 2] = tone * 0.92
    }
    return { positions, sphere, knot, colors }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    targetProgress.current = (state.pointer.x + 1) / 2
    progress.current += (targetProgress.current - progress.current) * 0.04

    const posAttr = pointsRef.current.geometry.attributes.position
    const arr = posAttr.array
    const p = progress.current

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2
      arr[ix] = sphere[ix] + (knot[ix] - sphere[ix]) * p
      arr[iy] = sphere[iy] + (knot[iy] - sphere[iy]) * p
      arr[iz] = sphere[iz] + (knot[iz] - sphere[iz]) * p
    }
    posAttr.needsUpdate = true

    pointsRef.current.rotation.y = t * 0.12
    pointsRef.current.rotation.x = Math.sin(t * 0.18) * 0.2
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function ParticleMorph() {
  return (
    <Canvas camera={{ position: [0, 0, 6.4], fov: 45 }} dpr={[1, 1.6]} gl={{ antialias: true }}>
      <MorphField />
    </Canvas>
  )
}
