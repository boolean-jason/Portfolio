import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLS = 14
const ROWS = 10
const SPACING = 0.5

function Field() {
  const meshRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const mouse = useRef(new THREE.Vector2(10, 10))

  const positions = useMemo(() => {
    const arr = []
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        arr.push([(x - COLS / 2) * SPACING, (y - ROWS / 2) * SPACING, 0])
      }
    }
    return arr
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mouse.current.lerp(
      new THREE.Vector2(state.pointer.x * 3.4, state.pointer.y * 2.4),
      0.08
    )

    positions.forEach((p, i) => {
      const [x, y] = p
      const dist = Math.hypot(x - mouse.current.x, y - mouse.current.y)
      const ripple = Math.sin(dist * 2.4 - t * 2.6) * Math.exp(-dist * 0.55)
      const z = ripple * 0.55
      const scale = 0.14 + Math.max(0, 0.2 - dist * 0.025)

      dummy.position.set(x, y, z)
      dummy.rotation.set(t * 0.3 + i * 0.05, t * 0.22 + i * 0.03, 0)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    meshRef.current.rotation.y = Math.sin(t * 0.06) * 0.18
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, positions.length]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#ece7da" wireframe transparent opacity={0.85} />
    </instancedMesh>
  )
}

export default function FieldExperiment() {
  return (
    <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} dpr={[1, 1.6]} gl={{ antialias: true }}>
      <Field />
    </Canvas>
  )
}
