export default function Botanical() {
  return (
    <svg
      className="botanical"
      viewBox="0 0 240 155"
      fill="none"
      stroke="currentColor"
      strokeWidth=".65"
      aria-hidden="true"
    >
      <defs>
        <g id="lily-leaf">
          <path d="M0 0C-51 23-77-9-55-34C-38-61 5-64 30-45C57-27 42 11 0 0Z" />
          <path d="M0 0-23-48M0 0-52-32M0 0-57-10M0 0-35 9M0 0 9-51M0 0 34-31M0 0 39-8" />
          <path d="m-23-48-6 20-23-4m23 4-5 20-23-2m28-18 23 3 15-26m-15 26 24 10 16-16M-6-25 0 0" />
          <path d="M-49-34q16-11 34-9t39 7M-59-15q20-10 37-9t60 9" />
        </g>
      </defs>
      <path d="M106 159Q104 101 62 67M133 158Q146 77 157 32M151 158Q160 126 193 100M121 158Q122 120 115 103M101 153Q89 123 50 117" />
      <use href="#lily-leaf" transform="translate(64 68) rotate(-12)" />
      <use
        href="#lily-leaf"
        transform="translate(158 34) scale(.7) rotate(18)"
      />
      <use
        href="#lily-leaf"
        transform="translate(193 104) scale(.6) rotate(35)"
      />
      <path d="M115 106C88 96 89 76 96 68Q108 72 115 88Q111 66 121 58Q131 74 125 89Q137 74 148 78Q147 99 115 106ZM115 106Q99 84 96 68M115 106Q119 84 121 58M115 106Q135 90 148 78M50 117Q23 124 17 103Q38 98 50 117ZM52 117Q47 95 65 86Q76 106 52 117" />
    </svg>
  );
}
