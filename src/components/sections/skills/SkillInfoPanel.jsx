import { AnimatePresence, motion } from 'framer-motion'

export function SkillInfoPanel({ skill }) {
  return (
    <AnimatePresence mode="wait">
      <motion.aside
        animate={{ opacity: 1, y: 0, scale: 1 }}
        aria-live="polite"
        className="skill-info-panel glass-panel"
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        key={skill.id}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="skill-info-orb" style={{ '--skill-color': skill.color }} />
          <div>
            <h3 className="font-display text-2xl font-bold text-space-text">{skill.name}</h3>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-space-accent">{skill.level}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-space-muted">{skill.description}</p>
        <ul className="mt-5 grid gap-2 text-sm text-slate-200">
          {skill.related.map((item) => (
            <li className="flex items-center gap-2" key={item}>
              <span className="size-1.5 rounded-full bg-space-secondary shadow-[0_0_14px_rgba(56,189,248,0.8)]" />
              {item}
            </li>
          ))}
        </ul>
      </motion.aside>
    </AnimatePresence>
  )
}
