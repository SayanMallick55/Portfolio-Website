import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiBookOpen, FiCompass, FiTarget } from 'react-icons/fi'
import { AstronautIllustration } from './about/AstronautIllustration'
import { InfoCard } from './about/InfoCard'
import { MissionTerminal } from './about/MissionTerminal'

const cards = [
  {
    icon: FiBookOpen,
    title: 'Education',
    items: ['B.Tech Computer Science Engineering', 'KIIT University'],
  },
  {
    icon: FiCompass,
    title: 'Current Status',
    items: ['Learning', 'Building Projects', 'Solving DSA', 'Exploring AI'],
  },
  {
    icon: FiTarget,
    title: 'Career Goal',
    items: ['Software Engineer', 'AI Engineer', 'Build products used by millions'],
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
}

export function About() {
  const terminalRef = useRef(null)
  const terminalInView = useInView(terminalRef, { once: true, amount: 0.35 })

  return (
    <section id="about" className="about-section relative overflow-hidden py-24 sm:py-32" aria-labelledby="about-title">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_34%,rgba(94,59,238,0.18),transparent_24rem),radial-gradient(circle_at_80%_60%,rgba(34,211,238,0.12),transparent_28rem)]" />
      <motion.div
        className="section-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.28 }}
      >
        <motion.div variants={itemVariants} className="relative">
          <p className="mb-3 font-display text-sm font-bold uppercase tracking-[0.28em] text-space-accent">
            Mission Brief
          </p>
          <h2 id="about-title" className="max-w-xl font-display text-4xl font-bold text-space-text sm:text-5xl">
            Profile data transmitted from low orbit.
          </h2>
          <AstronautIllustration />
        </motion.div>

        <div>
          <motion.div ref={terminalRef} variants={itemVariants}>
            <MissionTerminal active={terminalInView} />
          </motion.div>

          <motion.div
            className="mt-5 grid gap-4 md:grid-cols-3"
            variants={sectionVariants}
          >
            {cards.map((card) => (
              <InfoCard key={card.title} {...card} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
