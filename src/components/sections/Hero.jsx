import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { Button } from '../ui/Button'
import { MissionScene } from '../canvas/MissionScene'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/SayanMallick55/', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sayan-mallick-049323332/', icon: FiLinkedin },
  { label: 'LeetCode', href: 'https://leetcode.com/u/Sayan_tastic/', icon: SiLeetcode },
  { label: 'Email', href: 'mailto:sayanmallick7391@example.com', icon: FiMail },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.25 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  return (
    <section className="hero-section relative min-h-svh overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0.12, 5.6], fov: 48 }}
          dpr={[1, 1.45]}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
        >
          <color attach="background" args={['#030712']} />
          <MissionScene />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_72%_42%,rgba(56,189,248,0.12),transparent_26rem),linear-gradient(90deg,rgba(3,7,18,0.94)_0%,rgba(3,7,18,0.68)_42%,rgba(3,7,18,0.18)_100%)]" />

      <div className="section-shell relative z-10 flex min-h-svh items-center pb-16 pt-28">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} className="mb-5 font-display text-sm font-bold uppercase tracking-[0.28em] text-space-accent">
            Mission Control / Portfolio Launch
          </motion.p>
          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="text-balance font-display text-5xl font-bold leading-[0.96] text-space-text sm:text-6xl lg:text-8xl"
          >
            Hi, I'm <span className="text-gradient">Sayan Mallick</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg font-semibold text-space-secondary sm:text-xl">
            Computer Science Engineer | AI Enthusiast | Competitive Programmer
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-space-muted sm:text-lg">
            Still under construction, yet destined to shine, <br></br>One dream, one step, one commit at a time.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="#about" variant="primary" className="hero-button">
              Explore My Universe
            </Button>
            

<Button
  type="button"
  variant="ghost"
  className="hero-button"
  onClick={() => {
    const link = document.createElement('a')
    link.href = '/resume/Sayan_Mallick_Resume.pdf'
    link.download = 'Sayan_Mallick_Resume.pdf'
    link.click()
  }}
>
  <FiDownload aria-hidden="true" />
  Download Resume
</Button>


          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-3" aria-label="Social links">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  aria-label={label}
                  className="social-orbit-link"
                  href={href}
                  rel="noreferrer"
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                >
                  <Icon aria-hidden="true" size={18} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to About section">
        <span>Scroll</span>
        <FiArrowDown aria-hidden="true" />
      </a>
    </section>
  )
}
