// Stand-in for the supplied artwork: a laurel wreath around the wordmark, as on
// the pouches. To use the client's own file, drop it at public/images/logo.svg
// (or .png) and replace the <svg> below with an <img> pointing at it.
const leaves = Array.from({ length: 9 }, (_, i) => 118 + i * 16);

export default function Logo({ size = 56 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Sage & Seeds"
    >
      {[1, -1].map((side) => (
        <g key={side} transform={side === 1 ? undefined : "translate(100 0) scale(-1 1)"}>
          {leaves.map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            const x = 50 + 41 * Math.cos(a);
            const y = 50 + 41 * Math.sin(a);
            return (
              <ellipse
                key={deg}
                cx={x}
                cy={y}
                rx="3"
                ry="7"
                transform={`rotate(${deg + 8 + (i % 2) * 24} ${x} ${y})`}
              />
            );
          })}
        </g>
      ))}
      <g className="logo-text" textAnchor="middle">
        <text x="50" y="44" fontSize="13">SAGE</text>
        <text x="50" y="55" fontSize="10" fontStyle="italic">&amp;</text>
        <text x="50" y="68" fontSize="13">SEEDS</text>
      </g>
    </svg>
  );
}
