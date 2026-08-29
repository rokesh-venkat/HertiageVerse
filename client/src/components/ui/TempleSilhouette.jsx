// A simplified, original silhouette evoking the Shore Temple's stepped
// vimana towers — not a traced photograph, so no copyright/likeness risk.
// The scan-line sweeping through it is the page's signature element:
// it visualizes the product's actual thesis (physical → digital).
export default function TempleSilhouette({ className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 600 420"
        className="w-full h-full"
        role="img"
        aria-label="Stylized silhouette of a stepped stone temple tower"
      >
        <defs>
          <linearGradient id="stoneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-basalt-700)" />
            <stop offset="100%" stopColor="var(--color-basalt-900)" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="var(--color-gold-500)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="templeClip">
            <path d="M300 40 L330 90 L310 90 L340 140 L318 140 L352 195 L322 195 L360 255 L120 255 L158 195 L128 195 L162 140 L140 140 L170 90 L150 90 L180 40 Z
                     M60 255 L540 255 L540 300 L60 300 Z
                     M40 300 L560 300 L560 340 L40 340 Z" />
          </clipPath>
        </defs>

        <rect x="0" y="0" width="600" height="420" fill="url(#glow)" />

        {/* Main stepped vimana */}
        <path
          d="M300 40 L330 90 L310 90 L340 140 L318 140 L352 195 L322 195 L360 255 L120 255 L158 195 L128 195 L162 140 L140 140 L170 90 L150 90 L180 40 Z"
          fill="url(#stoneGrad)"
          stroke="var(--color-gold-600)"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        {/* Base platform tiers */}
        <path d="M60 255 L540 255 L540 300 L60 300 Z" fill="var(--color-basalt-800)" />
        <path d="M40 300 L560 300 L560 340 L40 340 Z" fill="var(--color-basalt-800)" />

        {/* Nandi row silhouettes along the base — small carved marks */}
        {[100, 160, 220, 380, 440, 500].map((x, i) => (
          <rect key={i} x={x} y="318" width="20" height="14" rx="2" fill="var(--color-basalt-700)" />
        ))}

        {/* Fine carved horizontal ridge lines for stone-tier texture */}
        {[100, 150, 200].map((y, i) => (
          <line key={i} x1="120" y1={y} x2="480" y2={y} stroke="var(--color-gold-600)" strokeOpacity="0.12" strokeWidth="1" />
        ))}

        {/* Scan-line sweep, clipped to the temple shape */}
        <g clipPath="url(#templeClip)">
          <rect
            className="scan-line"
            x="0"
            y="0"
            width="600"
            height="60"
            fill="var(--color-gold-400)"
            opacity="0.35"
          />
        </g>
      </svg>
    </div>
  )
}
