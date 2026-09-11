"use client";

import { useCallback, useEffect, useRef } from "react";

/** Decorative DOM stays separate from product content and never captures input. */
export function useMakhanaBurst() {
  const active = useRef<HTMLElement | null>(null);

  useEffect(() => () => active.current?.remove(), []);

  return useCallback((origin: DOMRect) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    active.current?.remove();
    const layer = document.createElement("div");
    layer.className = "makhana-burst";
    layer.setAttribute("aria-hidden", "true");
    layer.setAttribute("popover", "manual");
    document.body.appendChild(layer);
    active.current = layer;
    // The popover top layer keeps particles visible above the product dialog.
    if (typeof layer.showPopover === "function") layer.showPopover();

    const x = origin.left + origin.width / 2;
    const y = origin.top + origin.height * 0.4;
    const spread = Math.min(window.innerWidth * 0.36, 240);
    const animations: Animation[] = [];
    for (let i = 0; i < 9; i++) {
      const pop = document.createElement("span");
      pop.className = "makhana-pop";
      const size = 20 + (i % 4) * 7;
      pop.style.width = `${size}px`;
      pop.style.height = `${size * 0.94}px`;
      pop.style.left = `${x - size / 2}px`;
      pop.style.top = `${y - size / 2}px`;
      layer.appendChild(pop);
      const dx = ((i - 4) / 4) * spread;
      const rise = 80 + ((i * 37) % 100);
      const spin = (i % 2 ? -1 : 1) * (150 + i * 31);
      animations.push(
        pop.animate(
          [
            {
              transform: "translate3d(0,0,0) scale(.15) rotate(0deg)",
              opacity: 0,
            },
            {
              transform: `translate3d(${dx * 0.4}px,${-rise}px,0) scale(1.1) rotate(${spin * 0.4}deg)`,
              opacity: 1,
              offset: 0.34,
            },
            {
              transform: `translate3d(${dx * 0.8}px,${-rise * 0.55}px,0) scale(1) rotate(${spin * 0.75}deg)`,
              opacity: 1,
              offset: 0.65,
            },
            {
              transform: `translate3d(${dx}px,130px,0) scale(.55) rotate(${spin}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 1100 + (i % 3) * 100,
            easing: "cubic-bezier(.2,.6,.4,1)",
            fill: "forwards",
          },
        ),
      );
    }
    Promise.allSettled(animations.map((a) => a.finished)).then(() => {
      layer.remove();
      if (active.current === layer) active.current = null;
    });
  }, []);
}
