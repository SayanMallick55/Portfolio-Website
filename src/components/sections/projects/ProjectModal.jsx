
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FiGithub,
  FiX,
  FiExternalLink,
  FiAward,
} from 'react-icons/fi'
import { Button } from '../../ui/Button'

export function ProjectModal({ onClose, project }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const githubUrl = project.githubUrl
  const liveUrl = project.liveUrl
  const certificateUrl = project.certificateUrl

  return (
    <motion.div
      aria-labelledby="project-modal-title"
      aria-modal="true"
      className="project-modal-backdrop"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="dialog"
      style={{ '--station-color': project.color }}
    >
      <button
        className="project-modal-dismiss"
        type="button"
        aria-label="Close project details"
        onClick={onClose}
      />

      <motion.article
        className="project-modal-panel glass-panel"
        initial={{ opacity: 0, scale: 0.88, y: 44 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{
          duration: 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.24em] text-space-accent">
              {project.category}
              {project.status && ` · ${project.status}`}
            </p>

            <h3
              id="project-modal-title"
              className="mt-2 font-display text-3xl font-bold text-space-text sm:text-4xl"
            >
              {project.name}
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-space-accent/50 hover:bg-space-accent/10"
            type="button"
            aria-label="Close project details"
            onClick={onClose}
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        <p className="mt-5 max-w-3xl text-base leading-8 text-space-muted">
          {project.description}
        </p>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <h4 className="font-display text-lg font-bold text-space-text">
              Mission Features
            </h4>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {project.features.map((feature) => (
                <li className="flex gap-3" key={feature}>
                  <span className="mt-2 size-1.5 rounded-full bg-space-secondary shadow-[0_0_14px_rgba(56,189,248,0.8)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-7 font-display text-lg font-bold text-space-text">
              Tech Stack
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span className="project-tech-chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            className="project-screenshot-carousel"
            aria-label={`${project.name} screenshots`}
          >
            {[1, 2, 3].map((item) => (
              <div className="project-screenshot-frame" key={item}>
                <span>Screenshot {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
          {githubUrl && (
            <Button
              as="a"
              href={githubUrl}
              rel="noopener noreferrer"
              target="_blank"
              variant="primary"
            >
              <FiGithub aria-hidden="true" />
              GitHub
              <FiExternalLink aria-hidden="true" />
            </Button>
          )}

          {liveUrl && (
            <Button
              as="a"
              href={liveUrl}
              rel="noopener noreferrer"
              target="_blank"
              variant="ghost"
            >
              <FiExternalLink aria-hidden="true" />
              Live Demo
            </Button>
          )}

          {project.secondaryAction === 'Certificate' &&
            certificateUrl && (
              <Button
                as="a"
                href={certificateUrl}
                rel="noopener noreferrer"
                target="_blank"
                variant="ghost"
              >
                <FiAward aria-hidden="true" />
                Certificate
              </Button>
            )}
        </div>
      </motion.article>
    </motion.div>
  )
}
