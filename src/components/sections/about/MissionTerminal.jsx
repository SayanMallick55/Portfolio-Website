import { useEffect, useMemo, useState } from 'react'

const terminalLines = [
  '> booting mission...',
  '> loading profile...',
  '',
  'Name: Sayan Mallick',
  'Role: Computer Science Engineering Student',
  'Location: KIIT University',
  '',
  'Mission:',
  'Build intelligent software that solves real-world problems.',
  '',
  'Current Focus:',
  '• Data Structures & Algorithms',
  '• Artificial Intelligence & Machine Learning',
  '• Backend Development',
  '• Competitive Programming',
  '• Building impactful student products',
]

export function MissionTerminal({ active = false }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    if (!active) {
      return undefined
    }

    if (prefersReducedMotion) {
      setVisibleLines(terminalLines)
      setIsComplete(true)
      return undefined
    }

    let lineIndex = 0
    let charIndex = 0
    let timeoutId

    function typeNextCharacter() {
      const line = terminalLines[lineIndex]

      if (lineIndex >= terminalLines.length) {
        setIsComplete(true)
        return
      }

      if (line === '') {
        setVisibleLines((lines) => [...lines, ''])
        setCurrentLine('')
        lineIndex += 1
        timeoutId = window.setTimeout(typeNextCharacter, 180)
        return
      }

      if (charIndex <= line.length) {
        setCurrentLine(line.slice(0, charIndex))
        charIndex += 1
        timeoutId = window.setTimeout(typeNextCharacter, line.startsWith('•') ? 18 : 24)
        return
      }

      setVisibleLines((lines) => [...lines, line])
      setCurrentLine('')
      lineIndex += 1
      charIndex = 0
      timeoutId = window.setTimeout(typeNextCharacter, 170)
    }

    timeoutId = window.setTimeout(typeNextCharacter, 360)

    return () => window.clearTimeout(timeoutId)
  }, [active, prefersReducedMotion])

  return (
    <div className="mission-terminal glass-panel" role="region" aria-label="Mission profile terminal">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#ffbd2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-space-muted">
          mission-brief.exe
        </p>
      </div>

      <div className="min-h-[31rem] px-5 py-6 font-mono text-sm leading-7 text-slate-100 sm:px-6">
        {visibleLines.map((line, index) => (
          <p className={line === '' ? 'h-7' : 'terminal-line'} key={`${line}-${index}`}>
            {line}
          </p>
        ))}
        {!isComplete && (
          <p className="terminal-line">
            {currentLine}
            <span className="terminal-cursor" aria-hidden="true" />
          </p>
        )}
        {isComplete && <span className="terminal-cursor" aria-hidden="true" />}
      </div>
    </div>
  )
}
