import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { experienceMissions } from '../../data/experience'
import { CareerTelemetry } from './CareerTelemetry'
import { CareerTrajectory } from './CareerTrajectory'
import { MissionBriefing } from './MissionBriefing'

export function Experience() {
  const [activeMission, setActiveMission] = useState(null)
  const [hoveredMissionId, setHoveredMissionId] = useState(null)
  const sectionRef = useRef(null)
  const missionTriggerRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = activeMission ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [activeMission])

  function handlePointerMove(event) {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--flight-parallax-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`)
    event.currentTarget.style.setProperty('--flight-parallax-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 12}px`)
  }

  function openBriefing(mission, trigger) {
    missionTriggerRef.current = trigger
    setActiveMission(mission)
  }

  function closeBriefing() {
    setActiveMission(null)
    window.requestAnimationFrame(() => missionTriggerRef.current?.focus())
  }

  return <section id="experience" ref={sectionRef} className="flight-log-section" aria-labelledby="experience-title">
    <div className="project-starfield flight-log-stars" aria-hidden="true" />
    <div className="section-shell flight-log-shell">
      <header className="flight-log-reveal flight-log-header"><p className="flight-log-eyebrow">Experience</p><h2 id="experience-title">EXPERIENCE</h2><p>Tracing the missions that shaped my journey.</p></header>
      <div className="flight-log-reveal flight-log-console" onPointerMove={handlePointerMove}>
        <div className="flight-log-nebula" aria-hidden="true" /><div className="flight-log-grid" aria-hidden="true" />
        <p className="flight-log-coordinate flight-log-coordinate-a" aria-hidden="true">NAV / 21.61° N</p><p className="flight-log-coordinate flight-log-coordinate-b" aria-hidden="true">VECTOR / 048.2°</p>
        <CareerTrajectory missions={experienceMissions} activeId={activeMission?.id} hoveredId={hoveredMissionId} onHover={setHoveredMissionId} onSelect={openBriefing} />
        <CareerTelemetry />
      </div>
    </div>
    <AnimatePresence>{activeMission && <MissionBriefing mission={activeMission} onClose={closeBriefing} />}</AnimatePresence>
  </section>
}
