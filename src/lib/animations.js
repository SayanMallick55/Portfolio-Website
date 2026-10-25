import gsap from 'gsap'

export const motionPresets = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  },
  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  },
}

export function createRevealTimeline(scope, selector = '.reveal-up') {
  if (!scope) return undefined

  const targets = scope.querySelectorAll(selector)

  const tween = gsap.fromTo(
    targets,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.08,
    },
  )

  return () => tween.kill()
}
