import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiX } from 'react-icons/fi'
export function MissionBriefing({ mission, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => { closeRef.current?.focus(); const close = (event) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])
  function handleClose(event) {
    event.preventDefault()
    event.stopPropagation()
    onClose()
  }

  return <motion.div className="mission-briefing-layer" style={{ '--mission-color': mission.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="mission-briefing-title"><button className="mission-briefing-dismiss" aria-label="Close" type="button" onClick={handleClose} /><motion.article className="mission-briefing-panel" initial={{ opacity: 0, x: 90 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 90 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}><div className="briefing-topline"><span>MISSION BRIEFING / {mission.number}</span><button ref={closeRef} className="mission-briefing-close" type="button" onClick={handleClose} aria-label="Close"><FiX aria-hidden="true" /></button></div><p className="briefing-type">{mission.type}</p><h3 id="mission-briefing-title">{mission.role}</h3><h4>{mission.organization}</h4><div className="briefing-meta"><span>{mission.duration}</span><span><FiMapPin /> {mission.location}</span></div><section><p>Mission overview</p><div>{mission.description}</div></section><section><p>Key responsibilities</p><ul>{mission.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section><section><p>Skills</p><div className="briefing-skills">{mission.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section><section><p>Achievements</p><ul>{mission.achievements.map((item) => <li key={item}>{item}</li>)}</ul></section></motion.article></motion.div>
}
