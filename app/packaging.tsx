import { useId } from "react";

// These are unmodified client photographs. SVG clips only the surrounding room;
// the pouch, printed artwork, colours, and text are never regenerated or retouched.
const packs = {
  pink: {
    box: "190 115 970 1610",
    path: "M205 188 Q215 175 250 181 Q675 192 1030 130 Q1118 114 1133 151 L1146 203 1137 244 1117 256 1140 277 Q1100 487 1020 630 Q988 673 1010 711 L1028 750 982 1540 Q979 1619 943 1652 Q824 1740 656 1716 Q494 1710 371 1650 Q350 1630 348 1580 L331 789 Q316 679 291 625 Q249 579 230 492 L203 324 203 307 222 295 208 285 Q194 225 205 188Z",
  },
  classic: {
    box: "205 158 885 1455",
    path: "M236 178 Q259 164 299 173 Q660 222 999 207 Q1062 203 1074 245 L1080 267 1058 317 1055 357 Q1011 567 980 683 Q953 765 943 855 L889 1260 Q869 1390 833 1513 Q818 1560 795 1574 Q730 1599 641 1591 Q479 1611 397 1594 Q355 1591 336 1570 L309 1462 299 1107 299 815 313 593 Q344 515 305 473 Q256 419 236 364 L225 271 216 237 Q218 193 236 178Z",
  },
  masala: {
    box: "249 277 722 1169",
    path: "M261 351 Q279 331 307 339 L359 351 Q637 302 899 289 Q937 285 948 301 L961 319 952 367 941 412 Q925 515 888 597 Q867 648 870 713 L844 1098 834 1320 Q824 1374 792 1393 Q669 1455 541 1434 Q431 1434 379 1385 Q351 1358 348 1318 L333 847 334 663 Q350 615 327 573 Q294 519 284 458 L271 387 279 378 260 373Z",
  },
  cacao: {
    box: "260 202 720 1180",
    path: "M301 232 Q330 224 372 226 Q689 220 920 210 Q956 208 964 234 L971 278 954 315 953 345 Q931 443 901 504 Q883 547 885 590 L862 989 864 1242 Q853 1307 802 1335 Q675 1386 554 1367 Q445 1364 412 1336 Q391 1319 389 1285 L366 930 350 663 346 540 Q349 513 330 491 Q304 465 295 416 L273 329 Q268 278 283 249Z",
  },
};

export type PackKind = keyof typeof packs;
export default function Packaging({
  kind,
  className = "",
  label,
  original = false,
}: {
  kind: PackKind;
  className?: string;
  label?: string;
  original?: boolean;
}) {
  const id = useId().replaceAll(":", "");
  const pack = packs[kind];
  if (!original) {
    return (
      <img
        className={className}
        src={`/images/${kind}-lifestyle.png`}
        alt={label || `${kind} Sage & Seeds lifestyle photograph`}
        width={kind === "pink" || kind === "classic" ? 928 : 768}
        height={kind === "pink" || kind === "classic" ? 1152 : 1376}
      />
    );
  }
  return (
    <svg
      className={className}
      viewBox={pack.box}
      role="img"
      aria-label={label || `${kind} original Sage & Seeds packaging`}
    >
      <defs>
        <clipPath id={id}>
          <path d={pack.path} />
        </clipPath>
      </defs>
      <image
        href={`/images/${kind}-original.jpeg`}
        width="1373"
        height="1823"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}
