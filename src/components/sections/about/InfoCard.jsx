import { motion } from 'framer-motion'
import { Card } from '../../ui/Card'

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } },
}

export function InfoCard({ icon: Icon, title, items }) {
  return (
    <motion.div variants={cardVariants}>
      <Card className="about-info-card h-full p-5">
        <div className="mb-5 grid size-11 place-items-center rounded-full border border-space-accent/25 bg-space-accent/10 text-space-accent">
          <Icon aria-hidden="true" size={20} />
        </div>
        <h3 className="font-display text-lg font-bold text-space-text">{title}</h3>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-space-muted">
          {items.map((item) => (
            <li className="flex gap-2" key={item}>
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-space-secondary shadow-[0_0_14px_rgba(56,189,248,0.8)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}
