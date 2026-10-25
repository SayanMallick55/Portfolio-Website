import { Suspense, lazy } from 'react'
import { AppShell } from './components/layout/AppShell'
import { About } from './components/sections/About'
import { Hero } from './components/sections/Hero'
import { Contact } from './components/sections/Contact'

const SkillsGalaxy = lazy(() =>
  import('./components/sections/SkillsGalaxy').then((module) => ({ default: module.SkillsGalaxy })),
)

const ProjectsUniverse = lazy(() =>
  import('./components/sections/ProjectsUniverse').then((module) => ({ default: module.ProjectsUniverse })),
)

const Experience = lazy(() =>
  import('./components/experience/Experience').then((module) => ({ default: module.Experience })),
)

function App() {
  return (
    <AppShell>
      <Hero />
      <About />
      <Suspense fallback={null}>
        <SkillsGalaxy />
        <ProjectsUniverse />
        <Experience />
        <Contact />
      </Suspense>
    </AppShell>
  )
}

export default App
