import { motion, useReducedMotion } from 'framer-motion'
import { ExperienceWaypoint } from './ExperienceWaypoint'

export function CareerTrajectory({ missions, activeId, hoveredId, onHover, onSelect }) {
  const reduceMotion = useReducedMotion()
  return <div className="career-trajectory" aria-label="Career mission trajectory">
    <svg className="career-trajectory-svg" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true"><path className="trajectory-ghost" d="M 93 490 C 225 520, 290 330, 470 355 S 694 496, 895 128" /><motion.path className="trajectory-line" d="M 93 490 C 225 520, 290 330, 470 355 S 694 496, 895 128" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduceMotion ? 0 : 1.8, ease: [0.65, 0, 0.35, 1] }} /></svg>
    {missions.map((mission, index) => <ExperienceWaypoint key={mission.id} mission={mission} index={index} isActive={activeId === mission.id} isDimmed={Boolean(hoveredId) && hoveredId !== mission.id} onHover={onHover} onSelect={onSelect} />)}
    <div className="trajectory-terminal" aria-hidden="true"><span /> CURRENT<br />TRAJECTORY</div>
  </div>
}
