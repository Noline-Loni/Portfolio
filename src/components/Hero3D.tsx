import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Logo3D from './Logo3D'

/**
 * The WebGL hero scene, split into its own chunk and lazy-loaded from Hero.
 * Keeps three.js / @react-three out of the initial JS bundle (faster LCP/TBT).
 */
export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#F5F5EF" />
      <directionalLight position={[-3, 2, 4]} intensity={1.5} color="#E8E8E0" />
      <pointLight position={[-3, -2, -4]} intensity={1.2} color="#FB7751" />
      <pointLight position={[3, 3, -3]} intensity={0.6} color="#FB7751" />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <Logo3D />
    </Canvas>
  )
}
