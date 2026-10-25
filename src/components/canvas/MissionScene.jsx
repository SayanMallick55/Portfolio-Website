import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending, BackSide, CanvasTexture, MathUtils, Vector3 } from 'three'
import { useMemo, useRef } from 'react'

function createEarthTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  const ocean = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  ocean.addColorStop(0, '#06214f')
  ocean.addColorStop(0.45, '#0b4a86')
  ocean.addColorStop(1, '#03152f')
  ctx.fillStyle = ocean
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.globalAlpha = 0.9
  const land = [
    [170, 170, 130, 52],
    [272, 220, 86, 88],
    [474, 166, 170, 58],
    [590, 246, 116, 78],
    [756, 186, 142, 70],
    [850, 270, 92, 72],
  ]

  land.forEach(([x, y, w, h], index) => {
    const gradient = ctx.createRadialGradient(x, y, 8, x, y, Math.max(w, h))
    gradient.addColorStop(0, index % 2 ? '#9fbf74' : '#7aa56f')
    gradient.addColorStop(0.72, '#2f6f5b')
    gradient.addColorStop(1, 'rgba(34, 85, 63, 0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    for (let i = 0; i < 18; i += 1) {
      const angle = (i / 18) * Math.PI * 2
      const radiusX = w * (0.42 + 0.16 * Math.sin(i * 1.7))
      const radiusY = h * (0.44 + 0.16 * Math.cos(i * 2.1))
      const px = x + Math.cos(angle) * radiusX
      const py = y + Math.sin(angle) * radiusY
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fill()
  })

  ctx.globalAlpha = 0.34
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 4
  for (let i = 0; i < 30; i += 1) {
    const y = 38 + Math.random() * 430
    const x = Math.random() * 980
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.bezierCurveTo(x + 80, y - 28, x + 164, y + 28, x + 260, y)
    ctx.stroke()
  }

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = 'srgb'
  return texture
}

function createParticlePositions(count, radius, spreadY = 1) {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3
    const theta = Math.random() * Math.PI * 2
    const distance = radius * (0.35 + Math.random() * 0.65)
    positions[i3] = Math.cos(theta) * distance
    positions[i3 + 1] = (Math.random() - 0.5) * radius * spreadY
    positions[i3 + 2] = Math.sin(theta) * distance - 8
  }

  return positions
}

function StarField() {
  const starsRef = useRef(null)
  const positions = useMemo(() => createParticlePositions(3200, 34, 1.2), [])

  useFrame(({ clock }) => {
    if (!starsRef.current) return
    starsRef.current.rotation.y = clock.elapsedTime * 0.008
    starsRef.current.material.opacity = 0.72 + Math.sin(clock.elapsedTime * 1.7) * 0.12
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.032} sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

function SpaceDust() {
  const dustRef = useRef(null)
  const positions = useMemo(() => createParticlePositions(950, 18, 0.58), [])

  useFrame(({ clock }) => {
    if (!dustRef.current) return
    dustRef.current.rotation.y = clock.elapsedTime * -0.014
    dustRef.current.position.x = Math.sin(clock.elapsedTime * 0.18) * 0.35
  })

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#38bdf8" size={0.022} sizeAttenuation transparent opacity={0.32} />
    </points>
  )
}

function Nebula() {
  const meshRef = useRef(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z = clock.elapsedTime * 0.025
    meshRef.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} position={[-4.2, 0.9, -7]} rotation={[0, 0, -0.4]}>
      <planeGeometry args={[11, 6.2, 36, 36]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          float blob(vec2 uv, vec2 center, float radius) {
            float distanceToCenter = length(uv - center);
            return smoothstep(radius, 0.0, distanceToCenter);
          }

          void main() {
            vec2 uv = vUv;
            float drift = sin(uTime * 0.12) * 0.035;
            float field =
              blob(uv, vec2(0.26 + drift, 0.56), 0.48) * 0.62 +
              blob(uv, vec2(0.58, 0.38 - drift), 0.34) * 0.48 +
              blob(uv, vec2(0.72 - drift, 0.68), 0.28) * 0.36;
            float wisps = sin((uv.x + uv.y + uTime * 0.035) * 18.0) * 0.035;
            vec3 purple = vec3(0.37, 0.23, 0.93);
            vec3 cyan = vec3(0.13, 0.83, 0.93);
            vec3 color = mix(purple, cyan, uv.x + wisps);
            gl_FragColor = vec4(color, field * 0.36);
          }
        `}
      />
    </mesh>
  )
}

function Earth() {
  const earthRef = useRef(null)
  const cloudsRef = useRef(null)
  const texture = useMemo(() => createEarthTexture(), [])

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.08
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.105
  })

  return (
    <group position={[2.85, -0.28, -1.7]} rotation={[0.08, -0.34, -0.1]} scale={1.18}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.65, 96, 96]} />
        <meshStandardMaterial map={texture} metalness={0.02} roughness={0.72} emissive="#06152f" emissiveIntensity={0.14} />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.675, 64, 64]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.12} roughness={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.74, 64, 64]} />
        <meshBasicMaterial color="#38bdf8" side={BackSide} transparent opacity={0.18} blending={AdditiveBlending} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.83, 64, 64]} />
        <meshBasicMaterial color="#22d3ee" side={BackSide} transparent opacity={0.075} blending={AdditiveBlending} />
      </mesh>
    </group>
  )
}

function ShootingStars() {
  const groupRef = useRef(null)
  const stars = useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        delay: Math.random() * 4,
        speed: 1.6 + Math.random() * 1.8,
        position: new Vector3(-9 + Math.random() * 5, 3 + Math.random() * 4, -4 - Math.random() * 5),
      })),
    [],
  )

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((line, index) => {
      const star = stars[index]
      const cycle = ((clock.elapsedTime + star.delay) * star.speed) % 8
      const x = star.position.x + cycle * 2.35
      const y = star.position.y - cycle * 0.74
      const positions = line.geometry.attributes.position
      positions.setXYZ(0, x, y, star.position.z)
      positions.setXYZ(1, x - 1.15, y + 0.36, star.position.z)
      positions.needsUpdate = true
      line.material.opacity = cycle > 5.6 ? 0 : 0.72
    })
  })

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => {
        const positions = new Float32Array([star.position.x, star.position.y, star.position.z, star.position.x - 1, star.position.y + 0.3, star.position.z])
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.72} blending={AdditiveBlending} />
          </line>
        )
      })}
    </group>
  )
}

function CameraRig() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 0.42, 0.035)
    camera.position.y = MathUtils.lerp(camera.position.y, pointer.y * 0.24, 0.035)
    camera.lookAt(0.45, -0.08, -2.4)
  })

  return null
}

export function MissionScene() {
  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight color="#ffffff" intensity={2.8} position={[-3.8, 2.8, 4.5]} />
      <pointLight color="#38bdf8" intensity={42} position={[2.2, 1.2, 2.6]} />
      <pointLight color="#5e3bee" intensity={28} position={[-4, -1.2, -0.4]} />
      <Nebula />
      <StarField />
      <SpaceDust />
      <ShootingStars />
      <Earth />
      <CameraRig />
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.48} luminanceThreshold={0.38} luminanceSmoothing={0.72} mipmapBlur />
      </EffectComposer>
    </>
  )
}
