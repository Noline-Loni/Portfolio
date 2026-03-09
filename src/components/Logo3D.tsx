import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

export default function Logo3D() {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/nl_logo_3d_szene.gltf')
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  // Use window-level mouse tracking so overlays don't block it
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 range (same as R3F pointer)
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#2a2a2a'),
          metalness: 0.92,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          envMapIntensity: 2.5,
          reflectivity: 1,
        })
      }
    })
    return clone
  }, [scene])

  useFrame((state) => {
    if (!group.current) return

    // Smooth mouse tracking with lerp
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      target.current.x,
      0.035
    )
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      target.current.y,
      0.035
    )

    // Position panning — model follows the cursor with parallax
    group.current.position.x = mouse.current.x * 0.06
    group.current.position.y =
      mouse.current.y * 0.04 +
      Math.sin(state.clock.elapsedTime * 0.5) * 0.008

    // Rotation tilt — model tilts toward cursor direction
    group.current.rotation.y = mouse.current.x * 0.4
    group.current.rotation.x = -mouse.current.y * 0.25
  })

  return (
    <group ref={group} scale={7}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  )
}

useGLTF.preload('/models/nl_logo_3d_szene.gltf')
