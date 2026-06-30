import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* A pointer-driven particle swarm: points are pulled toward the cursor with
   spring/damping physics and trail behind it, picking up a warm-to-cool
   color shift based on how fast they're moving. */

const COUNT = 2200

function Swarm() {
  const pointsRef = useRef()
  const pointer = useRef(new THREE.Vector3(999, 999, 0))
  const targetPointer = useRef(new THREE.Vector2(999, 999))

  const { positions, home, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const home = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      const r = 2.6 * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6
      const z = r * Math.cos(phi) * 0.5

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      home[i * 3] = x
      home[i * 3 + 1] = y
      home[i * 3 + 2] = z

      colors[i * 3] = 0.92
      colors[i * 3 + 1] = 0.91
      colors[i * 3 + 2] = 0.85
    }
    return { positions, home, velocities, colors }
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    targetPointer.current.set(state.pointer.x * 3.2, state.pointer.y * 2.2)
    pointer.current.x += (targetPointer.current.x - pointer.current.x) * 0.12
    pointer.current.y += (targetPointer.current.y - pointer.current.y) * 0.12

    const posAttr = pointsRef.current.geometry.attributes.position
    const colAttr = pointsRef.current.geometry.attributes.color
    const arr = posAttr.array
    const colArr = colAttr.array

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      const dx = pointer.current.x - arr[ix]
      const dy = pointer.current.y - arr[iy]
      const dist = Math.hypot(dx, dy)
      const pull = Math.exp(-dist * 1.1) * 0.9

      const hx = home[ix] - arr[ix]
      const hy = home[iy] - arr[iy]
      const hz = home[iz] - arr[iz]

      velocities[ix] += dx * pull * 0.02 + hx * 0.012
      velocities[iy] += dy * pull * 0.02 + hy * 0.012
      velocities[iz] += hz * 0.012 + Math.sin(t * 0.6 + i) * 0.0006

      velocities[ix] *= 0.92
      velocities[iy] *= 0.92
      velocities[iz] *= 0.92

      arr[ix] += velocities[ix]
      arr[iy] += velocities[iy]
      arr[iz] += velocities[iz]

      const speed = Math.min(1, Math.hypot(velocities[ix], velocities[iy]) * 18)
      colArr[ix] = 0.92 + speed * 0.06
      colArr[iy] = 0.91 - speed * 0.25
      colArr[iz] = 0.85 - speed * 0.55
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
    pointsRef.current.rotation.y = Math.sin(t * 0.05) * 0.15
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function TouchSwarm() {
  const handlePointerLeave = () => {}
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true }}
      onPointerLeave={handlePointerLeave}
    >
      <Swarm />
    </Canvas>
  )
}
