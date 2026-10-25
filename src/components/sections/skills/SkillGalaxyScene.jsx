import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Html, Sphere } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, Color, MathUtils, Vector3 } from 'three'
import { skills } from '../../../data/skills'

function createPositions(count, radius, ySpread = 1) {
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3
    const angle = Math.random() * Math.PI * 2
    const distance = radius * (0.2 + Math.random() * 0.8)
    positions[i3] = Math.cos(angle) * distance
    positions[i3 + 1] = (Math.random() - 0.5) * radius * ySpread
    positions[i3 + 2] = Math.sin(angle) * distance
  }

  return positions
}

function StarMap() {
  const starsRef = useRef(null)
  const dustRef = useRef(null)
  const stars = useMemo(() => createPositions(1800, 18, 0.62), [])
  const dust = useMemo(() => createPositions(620, 11, 0.34), [])

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.elapsedTime * 0.006
      starsRef.current.material.opacity = 0.56 + Math.sin(clock.elapsedTime * 1.4) * 0.12
    }

    if (dustRef.current) {
      dustRef.current.rotation.y = clock.elapsedTime * -0.012
      dustRef.current.position.x = Math.sin(clock.elapsedTime * 0.2) * 0.28
    }
  })

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.026} sizeAttenuation transparent opacity={0.66} />
      </points>
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#38bdf8" size={0.025} sizeAttenuation transparent opacity={0.28} />
      </points>
    </>
  )
}

function NebulaClouds() {
  const meshRef = useRef(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.06) * 0.08
    meshRef.current.material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} position={[0, -0.9, -5.6]} rotation={[-0.92, 0, 0.2]}>
      <planeGeometry args={[13.5, 8.8, 32, 32]} />
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

          float cloud(vec2 uv, vec2 center, float radius) {
            return smoothstep(radius, 0.0, length(uv - center));
          }

          void main() {
            vec2 uv = vUv;
            float shift = sin(uTime * 0.08) * 0.04;
            float field =
              cloud(uv, vec2(0.25 + shift, 0.54), 0.42) * 0.58 +
              cloud(uv, vec2(0.52, 0.36 - shift), 0.36) * 0.45 +
              cloud(uv, vec2(0.76 - shift, 0.62), 0.32) * 0.4;
            float ripple = sin((uv.x * 14.0) + (uv.y * 20.0) + uTime * 0.18) * 0.04;
            vec3 color = mix(vec3(0.37, 0.23, 0.93), vec3(0.13, 0.83, 0.93), uv.x + ripple);
            gl_FragColor = vec4(color, field * 0.32);
          }
        `}
      />
    </mesh>
  )
}

function EnergyCore() {
  const coreRef = useRef(null)
  const haloRef = useRef(null)

  useFrame(({ clock }, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.22
      coreRef.current.rotation.y += delta * 0.32
      coreRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4) * 0.025)
    }

    if (haloRef.current) {
      haloRef.current.rotation.z -= delta * 0.16
    }
  })

  return (
    <group>
      <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.86, 0.014, 16, 128]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.72} blending={AdditiveBlending} />
      </mesh>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.48, 2]} />
        <meshStandardMaterial
          color="#5e3bee"
          emissive="#22d3ee"
          emissiveIntensity={1.6}
          metalness={0.35}
          roughness={0.18}
        />
      </mesh>
      <Sphere args={[0.68, 32, 32]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.1} blending={AdditiveBlending} />
      </Sphere>
      <Html center distanceFactor={8} position={[0, -0.98, 0]}>
        <div className="core-label">Technology Universe</div>
      </Html>
    </group>
  )
}

function OrbitPath({ radius, color }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.004, 8, 180]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} blending={AdditiveBlending} />
    </mesh>
  )
}

function SkillPlanet({ skill, hoveredSkillId, selectedSkillId, onHoverSkill, onSelectSkill }) {
  const groupRef = useRef(null)
  const planetRef = useRef(null)
  const color = useMemo(() => new Color(skill.color), [skill.color])
  const isHovered = hoveredSkillId === skill.id
  const isSelected = selectedSkillId === skill.id
  const hasSelection = Boolean(selectedSkillId)

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || !planetRef.current) return

    const angle = skill.phase + clock.elapsedTime * skill.speed
    const targetPosition = new Vector3(
      Math.cos(angle) * skill.orbitRadius,
      Math.sin(angle * 1.7) * 0.24,
      Math.sin(angle) * skill.orbitRadius * 0.64,
    )

    if (isSelected) {
      targetPosition.multiplyScalar(0.72)
      targetPosition.y += 0.28
      targetPosition.z += 1.08
    }

    groupRef.current.position.lerp(targetPosition, 0.055)
    groupRef.current.scale.lerp(new Vector3(isHovered || isSelected ? 1.32 : 1, isHovered || isSelected ? 1.32 : 1, isHovered || isSelected ? 1.32 : 1), 0.08)
    planetRef.current.rotation.y += delta * (0.45 + Math.abs(skill.speed))
    planetRef.current.rotation.x += delta * 0.08

    const faded = hasSelection && !isSelected && !isHovered
    planetRef.current.material.opacity = MathUtils.lerp(planetRef.current.material.opacity, faded ? 0.32 : 0.94, 0.08)
    planetRef.current.material.emissiveIntensity = MathUtils.lerp(
      planetRef.current.material.emissiveIntensity,
      isHovered || isSelected ? 0.92 : 0.36,
      0.08,
    )
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={planetRef}
        aria-label={`${skill.name} skill planet`}
        onClick={(event) => {
          event.stopPropagation()
          onSelectSkill(skill.id)
        }}
        onPointerEnter={(event) => {
          event.stopPropagation()
          document.body.style.cursor = 'pointer'
          onHoverSkill(skill.id)
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'auto'
          onHoverSkill(null)
        }}
      >
        <sphereGeometry args={[skill.size, 36, 36]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.36}
          metalness={0.18}
          roughness={0.42}
          transparent
          opacity={0.94}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[skill.size * 1.44, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered || isSelected ? 0.22 : 0.09} blending={AdditiveBlending} />
      </mesh>
    </group>
  )
}

function CameraRig() {
  const { camera, pointer } = useThree()

  useFrame(() => {
    camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 0.54, 0.035)
    camera.position.y = MathUtils.lerp(camera.position.y, 4.2 + pointer.y * 0.3, 0.035)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export function SkillGalaxyScene({ hoveredSkillId, selectedSkillId, onHoverSkill, onSelectSkill }) {
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight color="#ffffff" intensity={1.7} position={[3, 7, 5]} />
      <pointLight color="#22d3ee" intensity={54} distance={9} position={[0, 1.4, 1.6]} />
      <pointLight color="#5e3bee" intensity={38} distance={11} position={[-4, 2, -3]} />
      <NebulaClouds />
      <StarMap />
      {skills.map((skill) => (
        <OrbitPath color={skill.color} key={`${skill.id}-orbit`} radius={skill.orbitRadius} />
      ))}
      <EnergyCore />
      {skills.map((skill) => (
        <SkillPlanet
          hoveredSkillId={hoveredSkillId}
          key={skill.id}
          onHoverSkill={onHoverSkill}
          onSelectSkill={onSelectSkill}
          selectedSkillId={selectedSkillId}
          skill={skill}
        />
      ))}
      {!prefersReducedMotion && <CameraRig />}
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.42} luminanceThreshold={0.32} luminanceSmoothing={0.75} mipmapBlur />
      </EffectComposer>
    </>
  )
}
