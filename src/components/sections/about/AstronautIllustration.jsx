const particles = [
  'left-[14%] top-[24%] size-2 animation-delay-0',
  'right-[16%] top-[18%] size-1.5 animation-delay-300',
  'left-[20%] bottom-[22%] size-1.5 animation-delay-700',
  'right-[26%] bottom-[18%] size-2 animation-delay-1000',
  'left-[48%] top-[10%] size-1 animation-delay-500',
]

export function AstronautIllustration() {
  return (
    <div className="astronaut-stage mt-10" aria-hidden="true">
      <div className="astronaut-glow" />
      <div className="orbit-ring orbit-ring-outer" />
      <div className="orbit-ring orbit-ring-inner" />
      {particles.map((className) => (
        <span className={`orbit-particle ${className}`} key={className} />
      ))}

      <svg
        className="astronaut-svg"
        viewBox="0 0 420 420"
      >
        <defs>
          <linearGradient id="suitGradient" x1="110" x2="310" y1="70" y2="340">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="52%" stopColor="#b9d9ff" />
            <stop offset="100%" stopColor="#5e3bee" />
          </linearGradient>
          <linearGradient id="visorGradient" x1="146" x2="274" y1="104" y2="210">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="55%" stopColor="#08142a" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="astronaut-body" filter="url(#softGlow)">
          <path
            d="M126 256c-18 18-38 54-25 68 12 13 44-4 61-25l-36-43Z"
            fill="#dbeafe"
            opacity="0.9"
          />
          <path
            d="M294 256c18 18 38 54 25 68-12 13-44-4-61-25l36-43Z"
            fill="#c7d2fe"
            opacity="0.88"
          />
          <path
            d="M148 206c0-34 28-62 62-62s62 28 62 62v80c0 34-28 62-62 62s-62-28-62-62v-80Z"
            fill="url(#suitGradient)"
          />
          <path
            d="M158 206c0-29 23-52 52-52s52 23 52 52v4H158v-4Z"
            fill="#edf7ff"
          />
          <path
            d="M142 134c0-39 30-72 68-72s68 33 68 72-30 72-68 72-68-33-68-72Z"
            fill="#eaf6ff"
          />
          <path
            d="M164 132c0-28 20-48 46-48s46 20 46 48-20 48-46 48-46-20-46-48Z"
            fill="url(#visorGradient)"
          />
          <path
            d="M178 112c15-15 47-17 61 4"
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeWidth="7"
            opacity="0.42"
          />
          <path
            d="M174 234h72c10 0 18 8 18 18v28c0 10-8 18-18 18h-72c-10 0-18-8-18-18v-28c0-10 8-18 18-18Z"
            fill="#08142a"
            opacity="0.86"
          />
          <circle cx="184" cy="266" r="7" fill="#22d3ee" />
          <circle cx="210" cy="266" r="7" fill="#5e3bee" />
          <rect width="32" height="9" x="228" y="262" fill="#b9e7ff" opacity="0.8" rx="4.5" />
          <path
            d="M158 344c-18 10-22 36-11 44 12 8 38-5 50-25l-39-19Z"
            fill="#dbeafe"
          />
          <path
            d="M262 344c18 10 22 36 11 44-12 8-38-5-50-25l39-19Z"
            fill="#c7d2fe"
          />
        </g>

        <path
          className="tether-line"
          d="M277 212c32-9 59-1 78 24 18 24 20 52 7 84"
          fill="none"
          stroke="#38bdf8"
          strokeDasharray="6 10"
          strokeLinecap="round"
          strokeWidth="3"
          opacity="0.46"
        />
      </svg>
    </div>
  )
}
