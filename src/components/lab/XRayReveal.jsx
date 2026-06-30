import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* Single-pass take on a fluid X-ray reveal: a mouse-trail canvas feeds a
   screen-space mask into a shader that blends a "solid" liquid-metal look
   with an "x-ray" wireframe-and-fresnel look across the same mesh. */
const XRayMaterial = shaderMaterial(
  {
    uMask: null,
    uResolution: new THREE.Vector2(1, 1),
  },
  /* vertex */
  `
  varying vec3 vNormal;
  varying vec3 vPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  /* fragment */
  `
  uniform sampler2D uMask;
  uniform vec2 uResolution;
  varying vec3 vNormal;
  varying vec3 vPos;

  void main() {
    vec2 screenUV = gl_FragCoord.xy / uResolution;
    float mask = texture2D(uMask, screenUV).r;

    vec3 viewDir = normalize(cameraPosition - vPos);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);

    vec3 solidBase = mix(vec3(0.05, 0.05, 0.045), vec3(0.93, 0.91, 0.85), fresnel);

    float gridX = smoothstep(0.965, 1.0, fract(vPos.x * 7.0));
    float gridY = smoothstep(0.965, 1.0, fract(vPos.y * 7.0));
    float gridZ = smoothstep(0.965, 1.0, fract(vPos.z * 7.0));
    float grid = clamp(gridX + gridY + gridZ, 0.0, 1.0);

    vec3 xrayBase = fresnel * vec3(0.55, 0.85, 0.95) * 2.0 + grid * vec3(0.25, 0.55, 0.65);

    vec3 col = mix(solidBase, xrayBase, mask);
    gl_FragColor = vec4(col, 1.0);
  }
  `
)

extend({ XRayMaterial })

function XRayMesh() {
  const matRef = useRef()
  const meshRef = useRef()
  const { gl } = useThree()

  const trailCanvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 512
    return c
  }, [])
  const trailCtx = useMemo(() => trailCanvas.getContext('2d'), [trailCanvas])
  const trailTexture = useMemo(() => new THREE.CanvasTexture(trailCanvas), [trailCanvas])
  const pointer = useRef({ x: 0.5, y: 0.5, active: false })

  useEffect(() => {
    const el = gl.domElement
    const move = (e) => {
      const rect = el.getBoundingClientRect()
      pointer.current.x = (e.clientX - rect.left) / rect.width
      pointer.current.y = 1 - (e.clientY - rect.top) / rect.height
      pointer.current.active = true
    }
    const leave = () => { pointer.current.active = false }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [gl])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    trailCtx.fillStyle = 'rgba(0,0,0,0.055)'
    trailCtx.fillRect(0, 0, 512, 512)

    if (pointer.current.active) {
      const px = pointer.current.x * 512
      const py = pointer.current.y * 512
      const r = 95 + Math.sin(t * 3) * 6
      const grad = trailCtx.createRadialGradient(px, py, 0, px, py, r)
      grad.addColorStop(0, 'rgba(255,255,255,0.9)')
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      trailCtx.fillStyle = grad
      trailCtx.beginPath()
      trailCtx.arc(px, py, r, 0, Math.PI * 2)
      trailCtx.fill()
    }
    trailTexture.needsUpdate = true

    if (matRef.current) {
      matRef.current.uMask = trailTexture
      matRef.current.uResolution.set(gl.domElement.width, gl.domElement.height)
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.14
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.12
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.7, 32]} />
      <xRayMaterial ref={matRef} />
    </mesh>
  )
}

export default function XRayReveal() {
  return (
    <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true }}>
      <XRayMesh />
    </Canvas>
  )
}
