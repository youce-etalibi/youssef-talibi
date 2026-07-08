/* iOS-style rounded Morocco flag — drawn as SVG because Windows / many
   desktop browsers don't render the 🇲🇦 flag emoji. */
export default function MoroccoFlag({ size = 22, radius = 5, style }) {
  return (
    <svg
      width={size}
      height={size * (40 / 60)}
      viewBox="0 0 60 40"
      role="img"
      aria-label="Flag of Morocco"
      style={{ display: 'block', borderRadius: radius, ...style }}
    >
      <defs>
        <linearGradient id="ma-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d5313a" />
          <stop offset="1" stopColor="#c1272d" />
        </linearGradient>
        <clipPath id="ma-round">
          <rect x="0" y="0" width="60" height="40" rx={radius} ry={radius} />
        </clipPath>
      </defs>
      <g clipPath="url(#ma-round)">
        <rect x="0" y="0" width="60" height="40" fill="url(#ma-red)" />
        {/* Green interlaced pentagram (Seal of Solomon) */}
        <path
          d="M30 11 L35.29 27.28 L21.44 17.22 L38.56 17.22 L24.71 27.28 Z"
          fill="none"
          stroke="#006233"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
