import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowUpRight, FiRadio } from 'react-icons/fi'

export function ExperienceWaypoint({ mission, index, isDimmed, onHover, onSelect }) {
  const reduceMotion = useReducedMotion()
  return <motion.button className={`flight-waypoint flight-waypoint-${mission.position} ${mission.status === 'Active' ? 'is-current' : ''}`} style={{ '--mission-color': mission.color }} type="button" aria-label={`Open Mission ${mission.number}: ${mission.role} at ${mission.organization}`} initial={{ opacity: 0, scale: 0.76 }} whileInView={{ opacity: isDimmed ? 0.4 : 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: reduceMotion ? 0 : 0.5 + index * 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }} animate={{ opacity: isDimmed ? 0.4 : 1 }} onMouseEnter={() => onHover(mission.id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(mission.id)} onBlur={() => onHover(null)} onClick={(event) => onSelect(mission, event.currentTarget)}>
    <span className="waypoint-particles" aria-hidden="true" /><span className="waypoint-core" aria-hidden="true"><i /><b /></span>
    <span className="waypoint-label"><span className="waypoint-kicker"><FiRadio aria-hidden="true" /> MISSION {mission.number} {mission.status === 'Active' && <em>● ACTIVE</em>}</span><strong>{mission.organizationShort}</strong><span>{mission.role}</span><small>{mission.duration} · {mission.location} <FiArrowUpRight aria-hidden="true" /></small></span>
  </motion.button>
}
