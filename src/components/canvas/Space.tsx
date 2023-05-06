import {
  BakeShadows,
  CameraShake,
  ContactShadows,
  Stars,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'

const Space = () => {
  const [material, set] = useState()

  const spark = useRef<THREE.Points<
    THREE.BufferGeometry,
    THREE.Material | THREE.Material[]
  > | null>(null!)

  useFrame(({ clock, mouse }) => {
    if (!spark.current) return
    spark.current.rotation.z = clock.getElapsedTime() * 0.001
    spark.current.rotation.y = THREE.MathUtils.lerp(
      spark.current.rotation.y * 0.5,
      mouse.x * Math.PI * 0.2,
      0.001
    )

    spark.current.rotation.x = THREE.MathUtils.lerp(
      spark.current.rotation.x,
      mouse.y * Math.PI * 0.1,
      0.0001
    )
  })

  return (
    <>
      <Stars
        radius={50}
        depth={50}
        count={60000}
        factor={4}
        saturation={10}
        fade
        speed={3}
      />
    </>
  )
}

const SpaceBackground = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 100],
        fov: 15,
      }}
      dpr={[0, 3.5]}
      className="fixed h-full w-full left-0 bottom-0 top-0 bg-black"
    >
      <Suspense fallback={null}>
        <Space />
      </Suspense>

      <ContactShadows
        renderOrder={2}
        color="block"
        resolution={1024}
        scale={10}
        blur={1.5}
        opacity={0.65}
        far={0.5}
      />

      <BakeShadows />

      <CameraShake
        yawFrequency={0.1}
        pitchFrequency={0.1}
        rollFrequency={0.1}
      />
    </Canvas>
  )
}

export default SpaceBackground
