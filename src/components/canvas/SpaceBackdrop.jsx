import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export function SpaceBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#030712']} />
        <Stars count={900} depth={42} factor={3.8} fade speed={0.28} />
      </Canvas>
    </div>
  )
}
