// Line sketches for the four steps. They are stand-ins for hand-drawn artwork:
// to use real illustrations, replace the <svg> in StepArt with an <img> that
// points at a file such as /images/steps/cleaned.png.
export type StepName = "cleaned" | "dried" | "roasted" | "popped";

const rays = Array.from({ length: 10 }, (_, i) => {
  const a = (i * 36 * Math.PI) / 180;
  return [62 + 13 * Math.cos(a), 18 + 13 * Math.sin(a), 62 + 19 * Math.cos(a), 18 + 19 * Math.sin(a)];
});

export default function StepArt({ name }: { name: StepName }) {
  return (
    <svg
      className="step-art"
      viewBox="0 0 120 90"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "cleaned" && (
        <>
          <path d="M4 80 Q28 74 52 80 T100 80 T118 79M12 87 Q34 82 58 87 T114 86" />
          <ellipse cx="30" cy="76" rx="22" ry="6" />
          <path d="M30 76 L50 71M24 73 Q30 71 36 73" />
          <ellipse cx="92" cy="79" rx="16" ry="5" />
          <path d="M92 79 L106 76" />
          <path d="M62 72 C50 68 46 54 62 42 C78 54 74 68 62 72ZM62 72 C46 72 38 60 44 50 C52 54 58 62 62 72ZM62 72 C78 72 86 60 80 50 C72 54 66 62 62 72Z" />
          <path d="M62 72 C56 60 58 52 62 42M62 72 C68 60 66 52 62 42" />
          <path d="M96 22 C100 26 100 32 96 36 C92 32 92 26 96 22ZM96 36 V48" />
        </>
      )}
      {name === "dried" && (
        <>
          <circle cx="62" cy="18" r="9" />
          {rays.map(([x1, y1, x2, y2]) => (
            <path key={x1} d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`} />
          ))}
          <path d="M18 62 L74 62 L102 48 L46 48ZM18 62 V70 H74 V62M74 70 L102 56 V48" />
          <path d="M32 62 L60 48M46 62 L74 48M60 62 L88 48M22 58 L84 58M28 54 L90 54" />
          <path d="M24 70 V86M68 70 V86M98 56 V80" />
          <circle cx="40" cy="55" r="1.4" />
          <circle cx="58" cy="52" r="1.4" />
          <circle cx="70" cy="56" r="1.4" />
        </>
      )}
      {name === "roasted" && (
        <>
          <ellipse cx="58" cy="32" rx="30" ry="6" />
          <path d="M28 32 C22 52 34 64 58 64 C82 64 94 52 88 32" />
          <path d="M70 26 L98 4M98 4 q4 -2 6 2" />
          <path d="M42 86 C37 76 46 74 44 66 C53 72 54 80 49 86ZM58 88 C51 78 62 74 60 64 C71 72 69 82 64 88ZM73 86 C70 79 76 77 76 71 C83 77 81 82 78 86Z" />
          <path d="M26 90 L92 86M32 86 L86 91" />
        </>
      )}
      {name === "popped" && (
        <>
          <path d="M38 52 C32 36 52 24 64 28 C80 26 94 40 88 56 C86 72 62 76 50 70 C40 66 42 58 38 52Z" />
          <path d="M52 40 l2 1M70 36 l2 2M78 52 l2 1M56 60 l1 2M66 62 l2 -1M46 54 l2 0" />
          <path d="M28 20 L35 29M60 8 V19M98 22 L90 31M108 46 L98 48M16 50 L28 52" />
        </>
      )}
    </svg>
  );
}
