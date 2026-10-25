"use client";

import { useEffect, useRef, useState } from "react";

export type PublicReview = {
  id: string;
  name: string;
  rating: number;
  message: string;
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span>{"★".repeat(5 - rating)}</span>
    </div>
  );
}

export default function ReviewCarousel({ reviews }: { reviews: PublicReview[] }) {
  const count = reviews.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = (to: number) => setIndex(((to % count) + count) % count);

  useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (count === 0) return null;

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null || count < 2) return;
        const dx = event.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.map((review, i) => (
            <figure
              className="review"
              key={review.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <Stars rating={review.rating} />
              <blockquote>“{review.message}”</blockquote>
              <figcaption>— {review.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      {count > 1 && (
        <div className="carousel-controls">
          <button aria-label="Previous review" onClick={() => go(index - 1)}>
            ‹
          </button>
          <div className="carousel-dots">
            {reviews.map((review, i) => (
              <button
                key={review.id}
                aria-label={`Show review ${i + 1}`}
                aria-current={i === index}
                className={i === index ? "on" : ""}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button aria-label="Next review" onClick={() => go(index + 1)}>
            ›
          </button>
        </div>
      )}
    </div>
  );
}
