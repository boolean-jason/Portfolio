import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const COUNT = 2800

function sampleSphere(i, total) {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / total)
  const theta = Math.PI * (1 + Math.sqrt(5)) * i
  const radius = 1.82
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
  ]
}

function sampleKnot(i, total) {
  const t = (i / total) * Math.PI * 2
  const x = (2 + Math.cos(3 * t)) * Math.cos(2 * t)
  const y = (2 + Math.cos(3 * t)) * Math.sin(2 * t)
  const z = Math.sin(3 * t)
  return [x * 0.78, y * 0.78, z * 0.78]
}

function sampleHelix(i, total) {
  const progress = i / (total - 1)
  const t = progress * Math.PI * 12
  const radius = 1.2 + Math.sin(i * 1.618) * 0.18
  return [Math.cos(t) * radius, (progress - 0.5) * 3.8, Math.sin(t) * radius]
}

function sampleCube(i) {
  const face = i % 6
  const u = (((i * 0.61803398875) % 1) * 2 - 1) * 1.45
  const v = (((i * 0.754877666) % 1) * 2 - 1) * 1.45
  const side = 1.45

  if (face === 0) return [side, u, v]
  if (face === 1) return [-side, u, v]
  if (face === 2) return [u, side, v]
  if (face === 3) return [u, -side, v]
  if (face === 4) return [u, v, side]
  return [u, v, -side]
}

const SAMPLERS = {
  sphere: sampleSphere,
  knot: sampleKnot,
  helix: sampleHelix,
  cube: sampleCube,
}

function MorphField({ shape, pointerActive }) {
  const pointsRef = useRef()
  const velocities = useMemo(() => new Float32Array(COUNT * 3), [])

  const { positions, formations, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const formations = Object.fromEntries(
      Object.keys(SAMPLERS).map((name) => [name, new Float32Array(COUNT * 3)]),
    )

    for (let i = 0; i < COUNT; i++) {
      Object.entries(SAMPLERS).forEach(([name, sampler]) => {
        const [x, y, z] = sampler(i, COUNT)
        formations[name][i * 3] = x
        formations[name][i * 3 + 1] = y
        formations[name][i * 3 + 2] = z
      })

      positions[i * 3] = formations.sphere[i * 3]
      positions[i * 3 + 1] = formations.sphere[i * 3 + 1]
      positions[i * 3 + 2] = formations.sphere[i * 3 + 2]

      const tone = 0.79 + ((i * 17) % 23) / 145
      colors[i * 3] = tone
      colors[i * 3 + 1] = tone * 0.98
      colors[i * 3 + 2] = tone * 0.92
    }

    return { positions, formations, colors }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const target = formations[shape] ?? formations.sphere
    const positionAttribute = pointsRef.current.geometry.attributes.position
    const colorAttribute = pointsRef.current.geometry.attributes.color
    const current = positionAttribute.array
    const color = colorAttribute.array
    const pointerX = state.pointer.x * 3.5
    const pointerY = state.pointer.y * 2.35

    for (let i = 0; i < COUNT; i++) {
      const index = i * 3
      const dx = target[index] - current[index]
      const dy = target[index + 1] - current[index + 1]
      const dz = target[index + 2] - current[index + 2]

      velocities[index] += dx * 0.024
      velocities[index + 1] += dy * 0.024
      velocities[index + 2] += dz * 0.024

      let influence = 0
      if (pointerActive.current) {
        const cursorDx = pointerX - current[index]
        const cursorDy = pointerY - current[index + 1]
        const distance = Math.hypot(cursorDx, cursorDy)
        influence = Math.exp(-distance * 1.15)
        velocities[index] += cursorDx * influence * 0.018
        velocities[index + 1] += cursorDy * influence * 0.018
        velocities[index + 2] += Math.sin(time * 3 + i * 0.07) * influence * 0.012
      }

      velocities[index] *= 0.88
      velocities[index + 1] *= 0.88
      velocities[index + 2] *= 0.88

      current[index] += velocities[index]
      current[index + 1] += velocities[index + 1]
      current[index + 2] += velocities[index + 2]

      const speed = Math.min(1, Math.hypot(velocities[index], velocities[index + 1]) * 9)
      const pulse = Math.max(speed, influence)
      color[index] = 0.84 + pulse * 0.16
      color[index + 1] = 0.82 - pulse * 0.28
      color[index + 2] = 0.76 - pulse * 0.42
    }

    positionAttribute.needsUpdate = true
    colorAttribute.needsUpdate = true
    pointsRef.current.rotation.y = time * 0.09
    pointsRef.current.rotation.x = Math.sin(time * 0.16) * 0.12
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.027} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function ParticleMorph({ shape = 'sphere' }) {
  const pointerActive = useRef(false)

  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true }}
      onPointerEnter={() => { pointerActive.current = true }}
      onPointerMove={() => { pointerActive.current = true }}
      onPointerLeave={() => { pointerActive.current = false }}
    >
      <MorphField shape={shape} pointerActive={pointerActive} />
    </Canvas>
  )
}
