import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import TempleModel from './TempleModel'

export default function HeritageViewer() {
  const modelRef = useRef()

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-basalt-700 bg-basalt-900">
      <Canvas
        shadows
        camera={{ position: [9, 7, 11], fov: 45 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 14, 8]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <Suspense fallback={null}>
          <TempleModel ref={modelRef} />
          <Environment preset="sunset" />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.5}
            scale={20}
            blur={2}
            far={10}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={24}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={0.6}
          onStart={(e) => {
            // Stop auto-rotate the moment the user takes control
            e.target.autoRotate = false
          }}
        />
      </Canvas>
    </div>
  )
}
