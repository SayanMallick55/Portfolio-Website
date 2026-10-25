
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiLayers, FiGithub, FiExternalLink } from 'react-icons/fi'

function ProjectPreview({ project }) {
  return (
    <div className="project-preview" aria-hidden="true">
      <div className="project-preview-topbar">
        <span />
        <span />
        <span />
        <b>{project.name}</b>
      </div>

      <div className="project-preview-screen">
        <div className="project-preview-rail">
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="project-preview-main">
          <div className="project-preview-title">
            <span />
            <span />
          </div>

          <div className="project-preview-metrics">
            <i />
            <i />
            <i />
          </div>

          <div className="project-preview-graph">
            <span />
            <svg viewBox="0 0 260 72" preserveAspectRatio="none">
              <path d="M0 59 C28 54 35 25 64 37 S100 65 130 34 S172 7 195 25 S226 48 260 10" />
            </svg>
          </div>
        </div>
      </div>

      <div className="project-preview-scan" />
    </div>
  )
}

export function ProjectCard({ index, onSelect, project }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      className="project-file"
      style={{ '--project-color': project.color }}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.72,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="project-file-number" aria-hidden="true">
        {number}
      </span>

      <div className="project-file-identity">
        <span className="project-file-index">
          {number} / 0{4}
        </span>
        <p>Classified project file</p>
      </div>

      <div className="project-file-content">
        <div className="project-file-copy">
          <p className="project-file-category">
            {project.category}
            {project.status && (
              <span className="project-status">
                {' '}· {project.status}
              </span>
            )}
          </p>

          <h3>{project.name}</h3>

          <p className="project-file-description">
            {project.description}
          </p>

          <div className="project-file-stack">
            <span>
              <FiLayers aria-hidden="true" /> Stack
            </span>
            <p>{project.techStack.join(' / ')}</p>
          </div>

          
<div className="project-file-actions">
  {project.status === 'In Progress' ? (
    <span className="project-file-cta project-status-badge">
      IN PROGRESS
    </span>
  ) : (
    <button
      className="project-file-cta"
      type="button"
      onClick={onSelect}
    >
      Open Mission <FiArrowUpRight aria-hidden="true" />
    </button>
  )}
</div>

        </div>

        <button
          className="project-preview-button"
          type="button"
          aria-label={`Open ${project.name} mission brief`}
          onClick={onSelect}
        >
          <ProjectPreview project={project} />
          <span>
            Mission Preview <FiArrowUpRight aria-hidden="true" />
          </span>
        </button>
      </div>
    </motion.article>
  )
}
