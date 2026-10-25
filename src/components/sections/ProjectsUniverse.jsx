import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../../data/projects'
import { ProjectCard } from './projects/ProjectCard'
import { ProjectModal } from './projects/ProjectModal'

export function ProjectsUniverse() {
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeProject])

  return (
    <section
      id="projects"
      className="projects-universe-section"
      aria-labelledby="projects-title"
    >
      <div className="project-archive-backdrop" aria-hidden="true" />
      <div className="section-shell project-archive-shell">
        <motion.header className="project-archive-header" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <div className="project-archive-kicker"><span>Selected Work</span><i /></div>
          <h2 id="projects-title">Selected Work</h2>
          <div className="project-archive-meta"><span>Mission Archive / {String(projects.length).padStart(2, '0')}</span><span>Portfolio Transmission</span></div>
        </motion.header>
        <div className="project-archive-list">
          {projects.map((project, index) => <ProjectCard key={project.id} index={index} onSelect={() => setActiveProject(project)} project={project} />)}
        </div>
      </div>

      
{createPortal(
  <AnimatePresence>
    {activeProject && (
      <ProjectModal
        onClose={() => setActiveProject(null)}
        project={activeProject}
      />
    )}
  </AnimatePresence>,
  document.body
)}

    </section>
  )
}
