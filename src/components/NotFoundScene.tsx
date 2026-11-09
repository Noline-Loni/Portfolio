import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

/**
 * 404 wall you can knock down: the digits 4-0-4 built from physics blocks.
 * Click/tap throws a coral ball from the camera towards the pointer.
 * Lazy-loaded (three.js + cannon-es only load on the 404 page).
 */

export interface SceneApi {
  /** Throw at normalised device coords (-1..1); omit for a random aim at the wall. */
  throwBall: (ndcX?: number, ndcY?: number) => void
}

interface Props {
  apiRef: React.MutableRefObject<SceneApi | null>
  onProgress: (down: number, total: number) => void
}

const S = 0.5 // block size
const GAP = 0.02
const DEPTH_LAYERS = 2
const CREAM = new THREE.Color('#F5F5EF')
const CORAL = new THREE.Color('#FB7751')

// 4 columns × 5 rows, top row first
const GLYPHS: Record<string, string[]> = {
  '4': ['#..#', '#..#', '####', '...#', '...#'],
  '0': ['####', '#..#', '#..#', '#..#', '####'],
}
const TEXT = '404'
const COLS_PER_GLYPH = 4
const TOTAL_COLS = TEXT.length * COLS_PER_GLYPH + (TEXT.length - 1) // 1 col gap
const WALL_WIDTH = TOTAL_COLS * S

interface Block {
  start: THREE.Vector3
  coral: boolean
}

function buildBlocks(): Block[] {
  const blocks: Block[] = []
  TEXT.split('').forEach((ch, gi) => {
    const rows = GLYPHS[ch]
    const colOffset = gi * (COLS_PER_GLYPH + 1)
    rows.forEach((row, r) => {
      row.split('').forEach((cell, c) => {
        if (cell !== '#') return
        for (let d = 0; d < DEPTH_LAYERS; d++) {
          blocks.push({
            start: new THREE.Vector3(
              (colOffset + c) * S - WALL_WIDTH / 2 + S / 2,
              (rows.length - 1 - r) * S + S / 2,
              -d * S
            ),
            coral: ch === '0',
          })
        }
      })
    })
  })
  return blocks
}

/** Keeps the whole wall in view on any aspect ratio (phones included). */
function CameraRig() {
  const { camera, size } = useThree()
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    const aspect = size.width / size.height
    const wide = aspect > 1.1
    const halfFov = THREE.MathUtils.degToRad(cam.fov / 2)
    // Wall takes ~half the width on desktop, almost full width on phones
    const needW = WALL_WIDTH * (wide ? 2.1 : 1.25)
    const distW = needW / 2 / (Math.tan(halfFov) * aspect)
    const distH = 5 / 2 / Math.tan(halfFov)
    const dist = Math.max(distW, distH, 9)
    cam.position.set(0, 2.6, dist)
    cam.lookAt(0, 1.1, 0)
    // Shift the picture so the wall sits clear of the headline:
    // desktop → lower right, phone → lower half
    const w = size.width
    const h = size.height
    cam.setViewOffset(w, h, wide ? -w * 0.2 : 0, wide ? -h * 0.14 : -h * 0.24, w, h)
    cam.updateProjectionMatrix()
  }, [camera, size])
  return null
}

function Wall({ apiRef, onProgress }: Props) {
  const { camera, gl } = useThree()
  const blocks = useMemo(buildBlocks, [])
  const mesh = useRef<THREE.InstancedMesh>(null)
  const ballGroup = useRef<THREE.Group>(null)
  const frame = useRef(0)
  const lastDown = useRef(-1)

  // --- physics world -------------------------------------------------
  const sim = useMemo(() => {
    const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0) })
    // No sleeping: a sleeping block would keep floating when the block
    // beneath it gets knocked out. ~70 boxes are cheap enough to keep awake.
    world.allowSleep = false
    world.broadphase = new CANNON.SAPBroadphase(world)
    ;(world.solver as CANNON.GSSolver).iterations = 12
    const mat = new CANNON.Material('m')
    world.defaultContactMaterial = new CANNON.ContactMaterial(mat, mat, {
      friction: 0.4,
      restitution: 0.15,
    })
    world.defaultMaterial = mat

    const ground = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), material: mat })
    ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
    world.addBody(ground)

    // Blocks start "mortared" (static): bridges and overhangs in the digits
    // (top of the 0, left arm of the 4) would collapse on their own otherwise.
    // A block comes loose only when a ball or a falling block hits it hard.
    const half = new CANNON.Vec3((S - GAP) / 2, (S - GAP) / 2, (S - GAP) / 2)
    const bodies = blocks.map((b) => {
      const body = new CANNON.Body({
        mass: 1,
        shape: new CANNON.Box(half),
        material: mat,
        position: new CANNON.Vec3(b.start.x, b.start.y, b.start.z),
      })
      body.type = CANNON.Body.STATIC
      body.updateMassProperties()
      world.addBody(body)
      return body
    })
    const blockIds = new Set(bodies.map((b) => b.id))
    // body → the block resting directly on top of it (same column & depth)
    const keyOf = (v: THREE.Vector3) => `${Math.round(v.x / S)}|${Math.round(v.y / S)}|${Math.round(v.z / S)}`
    const byKey = new Map(blocks.map((b, i) => [keyOf(b.start), bodies[i]]))
    const above = new Map<CANNON.Body, CANNON.Body>()
    blocks.forEach((b, i) => {
      const up = byKey.get(keyOf(b.start.clone().add(new THREE.Vector3(0, S, 0))))
      if (up) above.set(bodies[i], up)
    })
    const ballIds = new Set<number>()

    const loosen = (body: CANNON.Body, hitter: CANNON.Body) => {
      if (body.type !== CANNON.Body.STATIC) return
      body.type = CANNON.Body.DYNAMIC
      body.mass = 1
      body.updateMassProperties()
      body.wakeUp()
      // carry over part of the hitter's momentum so hits feel punchy
      const v = hitter.velocity
      body.velocity.set(v.x * 0.45, v.y * 0.45 + 1, v.z * 0.45)
      // whatever was stacked on this block loses its support → falls too
      const up = above.get(body)
      if (up) loosen(up, body)
    }

    // Contact rule: static block + (ball | fast dynamic block) → loosen
    world.addEventListener('beginContact', (e: { bodyA: CANNON.Body; bodyB: CANNON.Body }) => {
      const pairs: [CANNON.Body, CANNON.Body][] = [
        [e.bodyA, e.bodyB],
        [e.bodyB, e.bodyA],
      ]
      for (const [target, hitter] of pairs) {
        if (!target || !hitter || !blockIds.has(target.id)) continue
        if (target.type !== CANNON.Body.STATIC) continue
        const isBall = ballIds.has(hitter.id)
        const fastBlock =
          blockIds.has(hitter.id) && hitter.type === CANNON.Body.DYNAMIC && hitter.velocity.length() > 2.5
        if (isBall || fastBlock) loosen(target, hitter)
      }
    })

    return { world, bodies, mat, ballIds, balls: [] as { body: CANNON.Body; mesh: THREE.Mesh }[] }
  }, [blocks])

  // --- colours -------------------------------------------------------
  useEffect(() => {
    if (!mesh.current) return
    blocks.forEach((b, i) => mesh.current!.setColorAt(i, b.coral ? CORAL : CREAM))
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  }, [blocks])

  // --- throwing --------------------------------------------------------
  const ballGeo = useMemo(() => new THREE.SphereGeometry(0.28, 24, 16), [])
  const ballMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CORAL, roughness: 0.35, metalness: 0.1 }),
    []
  )

  useEffect(() => {
    const ray = new THREE.Raycaster()
    const throwBall = (ndcX?: number, ndcY?: number) => {
      // Random aim at the wall if no pointer position (keyboard button)
      let dir: THREE.Vector3
      if (ndcX === undefined || ndcY === undefined) {
        // aim at a block that is still standing (fallback: any block)
        const standing = sim.bodies.filter((b) => b.type === CANNON.Body.STATIC)
        const pool = standing.length ? standing : sim.bodies
        const p = pool[Math.floor(Math.random() * pool.length)].position
        dir = new THREE.Vector3(p.x, p.y, p.z).sub(camera.position).normalize()
      } else {
        ray.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera)
        dir = ray.ray.direction.clone()
      }
      const origin = camera.position.clone().add(dir.clone().multiplyScalar(1.5))
      const body = new CANNON.Body({
        mass: 4,
        shape: new CANNON.Sphere(0.28),
        material: sim.mat,
        position: new CANNON.Vec3(origin.x, origin.y, origin.z),
      })
      const v = dir.multiplyScalar(26)
      body.velocity.set(v.x, v.y, v.z)
      sim.world.addBody(body)
      sim.ballIds.add(body.id)
      const m = new THREE.Mesh(ballGeo, ballMat)
      m.castShadow = true
      ballGroup.current?.add(m)
      sim.balls.push({ body, mesh: m })
      // keep at most 8 balls around
      if (sim.balls.length > 8) {
        const old = sim.balls.shift()!
        sim.world.removeBody(old.body)
        sim.ballIds.delete(old.body.id)
        ballGroup.current?.remove(old.mesh)
      }
    }
    apiRef.current = { throwBall }

    const el = gl.domElement
    const onDown = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      throwBall(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    }
    el.addEventListener('pointerdown', onDown)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      apiRef.current = null
    }
  }, [apiRef, ballGeo, ballMat, blocks, camera, gl, sim])

  // --- simulation + sync -------------------------------------------------
  const tmp = useMemo(() => new THREE.Object3D(), [])
  useFrame((_, delta) => {
    sim.world.step(1 / 60, Math.min(delta, 0.1), 3)

    let down = 0
    sim.bodies.forEach((body, i) => {
      tmp.position.set(body.position.x, body.position.y, body.position.z)
      tmp.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)
      tmp.updateMatrix()
      mesh.current?.setMatrixAt(i, tmp.matrix)
      const s = blocks[i].start
      const moved = Math.hypot(body.position.x - s.x, body.position.y - s.y, body.position.z - s.z)
      if (moved > S * 0.8 || body.position.y < s.y - S * 0.4) down++
    })
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true

    sim.balls.forEach(({ body, mesh: m }) => {
      m.position.set(body.position.x, body.position.y, body.position.z)
      m.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)
    })

    // report progress ~6×/s, only when it changed
    if (++frame.current % 10 === 0 && down !== lastDown.current) {
      lastDown.current = down
      onProgress(down, blocks.length)
    }
  })

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, blocks.length]} castShadow receiveShadow>
        <boxGeometry args={[S - GAP, S - GAP, S - GAP]} />
        <meshStandardMaterial roughness={0.55} metalness={0.05} />
      </instancedMesh>
      <group ref={ballGroup} />
      {/* shadow-catching floor, otherwise transparent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.35} />
      </mesh>
    </>
  )
}

export default function NotFoundScene(props: Props) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 40, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <CameraRig />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#F5F5EF', '#1F1F1F', 0.6]} />
      <directionalLight
        position={[4, 9, 7]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-4}
      />
      <pointLight position={[-5, 3, 4]} intensity={18} color="#FB7751" />
      <Wall {...props} />
    </Canvas>
  )
}
