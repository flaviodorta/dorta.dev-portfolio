import {
  CameraShake,
  OrbitControls,
  Reflector,
  ReflectorProps,
  useTexture,
} from '@react-three/drei'
import {
  Canvas,
  MeshProps,
  useFrame,
  useLoader,
  useThree,
} from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'
import { Suspense, useMemo, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { useEventListener, useMediaQuery } from 'usehooks-ts'

type TriangleProps = MeshProps & { color: string }

const Triangle = ({ color, ...props }: TriangleProps) => {
  const ref = useRef<THREE.Group>(null!)
  const [r] = useState(() => Math.random() * 10000)
  useFrame(
    (_) =>
      (ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10)
  )

  const {
    paths: [path],
  } = useLoader(SVGLoader, '/triangle.svg')

  const geom = useMemo(
    () =>
      SVGLoader.pointsToStroke(
        path.subPaths[0].getPoints(),
        path.userData?.style
      ),
    []
  )

  return (
    <group ref={ref}>
      <mesh geometry={geom} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

const Rig = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<THREE.Group>(null!)
  const vec = new THREE.Vector3()
  const { camera, mouse } = useThree()
  
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1)
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (-mouse.x * Math.PI) / 20,
      0.1
    )
  })

  return <group ref={ref}>{children}</group>
}

export const Triangles = () => {
  const mobile = useMediaQuery('(max-width: 767px)')
  const desktop = useMediaQuery('(min-width: 768px)')

  const scale = useMemo(() => {
    if (mobile) return 0.01
    if (desktop) return 0.012
  }, [mobile, desktop])

  // const [width, setWidth] = useState(window.)

  useEventListener('resize', () => {})

  return (
    <div className="w-screen h-[400px] md:h-[700px] overflow-hidden  left-0 top-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [isMobile ? 2 : 0, 0, 15] }}>
        <color attach="background" args={['#101010']} />
        <ambientLight />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        <Suspense fallback={null}>
          <Rig>
            <Triangle
              color="#ed0c32"
              scale={scale}
              rotation={[0, 0, Math.PI / 3]}
              position={[0, -1, 0]}
            />
            <Triangle
              color="#ed0c32"
              scale={scale}
              position={[2, -1, -2]}
              rotation={[0, 0, Math.PI / 3]}
            />
            <Triangle
              color="#ed0c32"
              scale={scale}
              position={[-2, -1, -2]}
              rotation={[0, 0, Math.PI / 3]}
            />
            <Triangle
              color="#ed0c32"
              scale={scale}
              position={[0, 0, -10]}
              rotation={[0, 0, Math.PI / 3]}
            />
          </Rig>

          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
          </EffectComposer>
        </Suspense>
        <CameraShake
          yawFrequency={0.2}
          pitchFrequency={0.2}
          rollFrequency={0.2}
        />
      </Canvas>
    </div>
  )
}

export default Triangles
