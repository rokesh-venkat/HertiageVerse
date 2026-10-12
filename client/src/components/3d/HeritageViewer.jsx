import { Component, Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, Center, ContactShadows, Environment, Html, OrbitControls, useGLTF } from '@react-three/drei'
import TempleModel from './TempleModel'

function ModelLoading() {
  return (
    <Html center>
      <div className="rounded-lg border border-basalt-700 bg-basalt-950/90 px-4 py-3 text-xs text-sand-200 whitespace-nowrap">
        Loading heritage model...
      </div>
    </Html>
  )
}

function LoadedModel({ modelPath }) {
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <Center top>
      <primitive object={scene} />
    </Center>
  )
}

class ModelErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function ProceduralFallback({ modelPath }) {
  return (
    <group>
      <TempleModel />
      {modelPath && (
        <Html center>
          <div className="rounded-lg border border-gold-600/50 bg-basalt-950/90 px-4 py-3 text-xs text-sand-200 whitespace-nowrap">
            Model unavailable; showing procedural view.
          </div>
        </Html>
      )}
    </group>
  )
}

function ViewerScene({ modelPath, has3DModel }) {
  const fallback = <ProceduralFallback modelPath={modelPath} />

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 14, 8]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <Suspense fallback={<ModelLoading />}>
        {has3DModel && modelPath ? (
          <ModelErrorBoundary fallback={fallback}>
            <Bounds fit clip margin={1.2}>
              <LoadedModel modelPath={modelPath} />
            </Bounds>
          </ModelErrorBoundary>
        ) : (
          <TempleModel />
        )}
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
        onStart={(event) => {
          event.target.autoRotate = false
        }}
      />
    </>
  )
}

export default function HeritageViewer({ modelPath, has3DModel, siteId }) {
  const modelRef = useRef()

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-basalt-700 bg-basalt-900" data-site-id={siteId}>
      <Canvas
        shadows
        camera={{ position: [9, 7, 11], fov: 45 }}
        dpr={[1, 2]}
      >
        <ViewerScene modelPath={modelPath} has3DModel={has3DModel} modelRef={modelRef} />
      </Canvas>
    </div>
  )
}
