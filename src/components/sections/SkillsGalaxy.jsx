import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { skills } from '../../data/skills'
import { SkillInfoPanel } from './skills/SkillInfoPanel'

const SkillGalaxyScene = lazy(() =>
  import('./skills/SkillGalaxyScene').then((module) => ({ default: module.SkillGalaxyScene })),
)

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.92, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SkillsGalaxy() {
  const [hoveredSkillId, setHoveredSkillId] = useState(null)
  const [selectedSkillId, setSelectedSkillId] = useState(null)
  const sectionRef = useRef(null)
  const activeSkill = skills.find((skill) => skill.id === (hoveredSkillId || selectedSkillId)) || skills[0]

  useEffect(() => {
    if (!sectionRef.current) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        '.galaxy-heading-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 },
      )
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <motion.section
      id="skills"
      ref={sectionRef}
      className="skills-galaxy-section relative min-h-svh overflow-hidden py-24 sm:py-32"
      aria-labelledby="skills-title"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(94,59,238,0.2),transparent_26rem),radial-gradient(circle_at_74%_22%,rgba(34,211,238,0.12),transparent_24rem),linear-gradient(180deg,rgba(3,7,18,0.96),rgba(3,7,18,0.9)_46%,rgba(3,7,18,0.98))]" />

      <div className="section-shell relative z-10">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="galaxy-heading-item mb-3 font-display text-sm font-bold uppercase tracking-[0.28em] text-space-accent">
            Skills Galaxy
          </p>
          <h2 id="skills-title" className="galaxy-heading-item font-display text-4xl font-bold text-space-text sm:text-5xl">
            A futuristic star map of my engineering toolkit.
          </h2>
          <p className="galaxy-heading-item mx-auto mt-4 max-w-2xl text-base leading-7 text-space-muted">
            Hover, focus, or select a planet to inspect the technologies orbiting my development universe.
          </p>
        </div>

        <div className="galaxy-shell glass-panel relative min-h-[44rem] overflow-hidden rounded-[1.75rem]">
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 4.2, 8.6], fov: 46 }}
              dpr={[1, 1.35]}
              gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
            >
              <Suspense fallback={null}>
                <SkillGalaxyScene
                  hoveredSkillId={hoveredSkillId}
                  selectedSkillId={selectedSkillId}
                  onHoverSkill={setHoveredSkillId}
                  onSelectSkill={setSelectedSkillId}
                />
              </Suspense>
            </Canvas>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-space-bg/55 to-transparent" />
          <SkillInfoPanel skill={activeSkill} />

          <div className="galaxy-controls" aria-label="Skill planet selector">
            {skills.map((skill) => (
              <button
                aria-pressed={(selectedSkillId || hoveredSkillId) === skill.id}
                className="galaxy-control-button"
                key={skill.id}
                onBlur={() => setHoveredSkillId(null)}
                onClick={() => setSelectedSkillId(skill.id)}
                onFocus={() => setHoveredSkillId(skill.id)}
                onMouseEnter={() => setHoveredSkillId(skill.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                style={{ '--skill-color': skill.color }}
                type="button"
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
