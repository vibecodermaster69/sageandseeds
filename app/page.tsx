"use client";

import { useEffect, useRef, useState } from "react";
import Botanical from "./botanical";
import Logo from "./logo";
import Packaging, { type PackKind } from "./packaging";
import { useMakhanaBurst } from "./use-makhana-burst";

const products = [
  {
    name: "Himalayan Pink Salt",
    copy: "Simple. Clean. Classic.",
    dot: "#d9788c",
    kind: "pink" as PackKind,
  },
  {
    name: "Classic Salt & Pepper",
    copy: "Classic with a peppery kick.",
    dot: "#b9ab94",
    kind: "classic" as PackKind,
  },
  {
    name: "Indian Masala",
    copy: "A timeless favourite with a little more kick.",
    dot: "#c8742a",
    kind: "masala" as PackKind,
  },
  {
    name: "Cacao Crunch",
    copy: "Guilt-free sweet indulgence.",
    dot: "#6b4230",
    kind: "cacao" as PackKind,
    note: "Contains milk powder. Not vegan.",
  },
];

type Product = (typeof products)[number];
type PublicReview = {
  id: string;
  name: string;
  rating: number;
  message: string;
};

// Supplied by the client; approved reviews from the site are added after these.
const featuredReviews: PublicReview[] = [
  {
    id: "nidhi",
    name: "Nidhi",
    rating: 5,
    message:
      "Absolutely love these makhanas—light, crunchy and satisfyingly filling!",
  },
  {
    id: "alberta",
    name: "Alberta",
    rating: 5,
    message:
      "Love the variety of flavours! While my son’s favourite is the Cacao Crunch, I can’t get enough of the Himalayan Pink Salt. Definitely recommend!",
  },
];

const steps = ["Cleaned", "Dried", "Roasted", "Popped"];

const values = [
  {
    label: "Honest ingredients",
    path: "M12 22C12 22 17 18 17 13C17 8 12 2 12 2C12 2 7 8 7 13C7 18 12 22 12 22ZM12 2V22M12 14C14.5 13 16 11 16 11M12 11C9.5 10 8 8 8 8",
  },
  {
    label: "Rooted in tradition",
    path: "M3 21h18M5 21V10h14v11M2 10l10-7 10 7M9 21v-5h6v5M9 10h6",
  },
  {
    label: "Made with care",
    path: "M12 7.5C12.5 6 15 5.5 16 7C17 8.5 15.5 11 12 13.5C8.5 11 7 8.5 8 7C9 5.5 11.5 6 12 7.5ZM2 13c1.5 1 4 .5 5-1.5M22 13c-1.5 1-4 .5-5-1.5M7 16c2 3 5 4.5 5 4.5s3-1.5 5-4.5",
  },
  {
    label: "Better choices, every day",
    path: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span>{"★".repeat(5 - rating)}</span>
    </div>
  );
}

export default function Home() {
  const popMakhana = useMakhanaBurst();
  const dialog = useRef<HTMLDialogElement>(null);
  const [panel, setPanel] = useState("search");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [approved, setApproved] = useState<PublicReview[]>([]);
  const [reviewer, setReviewer] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewState, setReviewState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : { reviews: [] }))
      .then((data) => setApproved(data.reviews ?? []))
      .catch(() => undefined);
  }, []);

  function openPanel(name: string) {
    setPanel(name);
    dialog.current?.showModal();
  }

  function openProduct(product: Product) {
    setSelected(product);
    openPanel("product");
  }

  async function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rating) {
      setReviewError("Please choose a star rating.");
      setReviewState("error");
      return;
    }
    const website = new FormData(event.currentTarget).get("website");
    setReviewState("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: reviewer,
          message: reviewMessage,
          rating,
          website,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }
      setReviewState("sent");
    } catch (error) {
      setReviewError((error as Error).message);
      setReviewState("error");
    }
  }

  const reviews = [...featuredReviews, ...approved];

  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="header">
        <div className="wrap header-inner">
          <a className="brand" href="#top" aria-label="Sage and Seeds home">
            <Logo />
            <span className="brand-name">
              <span>
                Sage <i>&amp;</i> Seeds
              </span>
              <small>Clean. Nourishing. Honest.</small>
            </span>
          </a>
          <nav className="nav" aria-label="Main">
            <a href="#makhana">What are Water Lily Pops?</a>
            <a href="#story">Our Story</a>
            <a href="#shop">Shop</a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search"
              onClick={() => openPanel("search")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button
              className="icon-button"
              aria-label="Shopping bag"
              onClick={() => openPanel("bag")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="main-content">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Mindful snacking · Rooted in India</p>
            <h1>
              Meet Makhana
              <span>Mindful snacking rooted in tradition.</span>
            </h1>
            <p className="lead">
              Makhana is the seed of the water lily — a traditional Indian food
              that has been enjoyed for generations.
            </p>
            <div className="hero-actions">
              <a className="button" href="#shop">
                Shop Makhana
              </a>
              <p className="flavour-availability">
                <span className="dots" aria-hidden="true">
                  {products.map((p) => (
                    <i key={p.kind} style={{ background: p.dot }} />
                  ))}
                </span>
                Available in 4 flavours
              </p>
            </div>
          </div>
          <button
            className="hero-visual"
            aria-label="Pop some makhana"
            onClick={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              popMakhana(
                new DOMRect(
                  bounds.left + bounds.width * 0.58,
                  bounds.top + bounds.height * 0.18,
                  bounds.width * 0.24,
                  bounds.height * 0.66,
                ),
              );
            }}
          >
            <img
              src="/images/hero-client.jpg"
              alt="Sage & Seeds Indian Bazaar Masala pouch beside a terracotta bowl of makhana and Indian spices"
              fetchPriority="high"
              width="901"
              height="572"
            />
            <span className="pop-hint">Tap for a little crunch</span>
          </button>
        </div>
      </section>

      <section className="section has-botanical" id="makhana">
        <Botanical />
        <div className="wrap split">
          <header className="section-head">
            <p className="eyebrow">What are Water Lily Pops?</p>
            <h2>
              Meet Makhana
              <span>Mindful snacking rooted in tradition.</span>
            </h2>
            <figure className="photo photo-bowl">
              <img
                src="/images/hero-scene.webp"
                alt="A speckled ceramic bowl heaped with white puffed makhana on linen"
                width="1536"
                height="1024"
                loading="lazy"
              />
              <figcaption>The seed of the water lily</figcaption>
            </figure>
          </header>
          <div className="prose">
            <p className="prose-lead">
              Makhana is the seed of the water lily — a traditional Indian food
              that has been enjoyed for generations.
            </p>
            <p>
              Cultivated in ponds and lakes, particularly across eastern India,
              Makhana has a long history in Indian food culture and Ayurveda,
              where it is regarded as a sattvic food associated with purity and
              wholesomeness.
            </p>
            <p>
              For much of the Western world, Makhana is still relatively
              undiscovered. But that is changing.
            </p>
            <p>
              Sage &amp; Seeds is here to introduce this humble Indian
              ingredient to a new audience — bringing its tradition,
              versatility and satisfying crunch to modern snacking.
            </p>
          </div>
        </div>
      </section>

      <section className="section band-sage has-botanical">
        <Botanical />
        <div className="wrap split">
          <header className="section-head">
            <p className="eyebrow">The journey behind the crunch</p>
            <h2>
              More than a snack.
              <span>A labour of love.</span>
            </h2>
            <ol className="steps" aria-label="How makhana is made">
              {steps.map((step, i) => (
                <li key={step}>
                  <b>{i + 1}</b>
                  {step}
                </li>
              ))}
            </ol>
            <figure className="photo photo-scoop">
              <img
                src="/images/hero-scene.webp"
                alt="A wooden scoop of freshly popped makhana on a stone counter"
                width="1536"
                height="1024"
                loading="lazy"
              />
            </figure>
          </header>
          <div className="prose">
            <p className="prose-lead">
              What looks simple in a packet has a remarkable amount of work
              behind it.
            </p>
            <p>
              Makhana is traditionally harvested from water and goes through a
              careful process of cleaning, drying, roasting and popping before
              it becomes the delicate, crunchy snack we know today.
            </p>
            <p>
              The process is labour-intensive and relies on human skill,
              patience and care.
            </p>
            <p>
              Even the occasional natural dark mark you may see on a Makhana pop
              can be part of the traditional popping process.
            </p>
            <p>This isn’t just another bag of chips or popcorn.</p>
            <p className="prose-close">
              It’s Makhana — brought to you by people, process and patience.
            </p>
          </div>
        </div>
      </section>

      <section className="section band-sand" id="story">
        <div className="wrap split">
          <header className="section-head">
            <p className="eyebrow">Our Story</p>
            <h2 className="mindset">
              Not a demographic.
              <span>A mindset.</span>
            </h2>
          </header>
          <div className="prose">
            <p className="prose-lead">
              Sage &amp; Seeds was born from a desire to step away from the
              conventional corporate path and build something more meaningful.
            </p>
            <blockquote>
              <p>
                “With a personal passion for nutrition and food science, and the
                everyday realities of being a working mom, I found myself
                constantly searching for nutritious yet convenient food
                options. While fresh food is often the ideal choice, preparing
                it from scratch takes time—something busy families don’t always
                have. I began to wonder: What if packaged foods could offer the
                same thoughtful balance of nutrition, quality, and convenience?
                What if we could make better everyday food choices without
                compromising on nourishment or spending hours in the kitchen?”
              </p>
            </blockquote>
            <p>The answer led me to Makhana (Water Lily Pops).</p>
            <p>
              Simple, versatile and rooted in a rich Indian tradition, Makhana
              felt like the natural place to begin.
            </p>
            <p>
              But Sage &amp; Seeds is about more than one snack. It is built
              around a simple belief: the things we choose to bring into our
              lives should be honest, clean, nourishing and wholesome.
            </p>
            <p className="prose-close">
              Makhana is our first product. It is only the beginning.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="shop">
        <div className="wrap">
          <header className="section-head centered">
            <p className="eyebrow">Shop</p>
            <h2>Four flavours. One wholesome snack.</h2>
            <p className="section-subtitle">
              Designed as an individual serving of Makhana.
            </p>
          </header>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product" key={product.kind}>
                <button
                  className="product-image"
                  aria-label={`View ${product.name}`}
                  style={{
                    backgroundImage: `url(/images/${product.kind}-lifestyle.png)`,
                  }}
                  onClick={(event) => {
                    const origin = event.currentTarget.getBoundingClientRect();
                    openProduct(product);
                    popMakhana(origin);
                  }}
                >
                  <Packaging
                    kind={product.kind}
                    label={`${product.name} lifestyle photograph`}
                  />
                </button>
                <div className="product-info">
                  <h3>
                    <i style={{ background: product.dot }} aria-hidden="true" />
                    {product.name}
                  </h3>
                  <p>{product.copy}</p>
                  <div className="product-foot">
                    <span className="price">30 g · CHF 3.49</span>
                    <button
                      className="button button-small"
                      onClick={() => openProduct(product)}
                    >
                      Shop now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="delivery-note">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <p>
              <b>We currently ship directly to you.</b> From our family to your
              pantry, delivered with care. Shipping costs are added at checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="section band-sand" id="reviews">
        <div className="wrap">
          <header className="section-head centered">
            <p className="eyebrow">What our customers say</p>
            <h2>Loved by busy, mindful snackers.</h2>
          </header>
          <div className="review-grid">
            {reviews.map((review) => (
              <figure className="review" key={review.id}>
                <Stars rating={review.rating} />
                <blockquote>“{review.message.replace(/^“|”$/g, "")}”</blockquote>
                <figcaption>— {review.name}</figcaption>
              </figure>
            ))}
          </div>
          <div className="review-cta">
            <button
              className="button button-outline"
              onClick={() => {
                setReviewState("idle");
                setReviewError("");
                openPanel("review");
              }}
            >
              Leave a review
            </button>
            <p>Reviews are published after our team has read them.</p>
          </div>
        </div>
      </section>

      <footer className="values">
        <div className="wrap values-grid">
          {values.map((value) => (
            <div className="value-item" key={value.label}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={value.path} />
              </svg>
              <span>{value.label}</span>
            </div>
          ))}
        </div>
        <p className="copyright">© Sage &amp; Seeds · Makhana is our first product.</p>
      </footer>

      <dialog
        ref={dialog}
        className="info-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close dialog"
          onClick={() => dialog.current?.close()}
        >
          &times;
        </button>
        {panel === "search" && (
          <>
            <p className="eyebrow">Find your flavour</p>
            <h2>Something for every mood.</h2>
            <label htmlFor="search">Search our collection</label>
            <input
              id="search"
              type="search"
              placeholder="Try salt, masala or cacao"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="search-results">
              {products
                .filter((p) =>
                  p.name.toLowerCase().includes(query.toLowerCase()),
                )
                .map((p) => (
                  <button key={p.kind} onClick={() => openProduct(p)}>
                    {p.name}
                    <span>CHF 3.49 &rarr;</span>
                  </button>
                ))}
              {!products.some((p) =>
                p.name.toLowerCase().includes(query.toLowerCase()),
              ) && <p>No flavours found. Try another search.</p>}
            </div>
          </>
        )}
        {panel === "bag" && (
          <>
            <p className="eyebrow">Your shopping bag</p>
            <h2>A little goodness awaits.</h2>
            <p>Your bag is empty. Online ordering is not available yet.</p>
            <a
              className="button"
              href="#shop"
              onClick={() => dialog.current?.close()}
            >
              Explore the flavours
            </a>
          </>
        )}
        {panel === "review" && (
          <>
            <p className="eyebrow">Share your experience</p>
            <h2>Leave a review.</h2>
            {reviewState === "sent" ? (
              <p className="review-confirmation">
                Thank you, {reviewer || "friend"}. Your review has been sent to
                our team and will only be published once we have read and
                approved it.
              </p>
            ) : (
              <form className="review-form" onSubmit={submitReview}>
                <fieldset>
                  <legend>Your rating</legend>
                  <div className="star-picker" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                        aria-pressed={rating === n}
                        className={n <= (hover || rating) ? "on" : ""}
                        onMouseEnter={() => setHover(n)}
                        onClick={() => setRating(n)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label htmlFor="reviewer">Your name</label>
                <input
                  id="reviewer"
                  required
                  maxLength={60}
                  value={reviewer}
                  onChange={(event) => setReviewer(event.target.value)}
                />
                <label htmlFor="review-message">Your review</label>
                <textarea
                  id="review-message"
                  required
                  minLength={10}
                  maxLength={800}
                  value={reviewMessage}
                  onChange={(event) => setReviewMessage(event.target.value)}
                />
                <input
                  className="hp"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                {reviewState === "error" && (
                  <p className="review-error" role="alert">
                    {reviewError}
                  </p>
                )}
                <p className="review-note">
                  Every review is checked by our team before it is published.
                </p>
                <button
                  className="button"
                  type="submit"
                  disabled={reviewState === "sending"}
                >
                  {reviewState === "sending" ? "Sending…" : "Send for review"}
                </button>
              </form>
            )}
          </>
        )}
        {panel === "product" && selected && (
          <div className="product-detail">
            <button
              className="detail-pack-button"
              aria-label="Pop more makhana"
              onClick={(event) =>
                popMakhana(event.currentTarget.getBoundingClientRect())
              }
            >
              <Packaging
                kind={selected.kind}
                label={selected.name + " lifestyle photograph"}
                className="detail-pack"
              />
            </button>
            <div>
              <p className="eyebrow">Puffed lily pops</p>
              <h2>{selected.name}</h2>
              <p>{selected.copy}</p>
              {selected.note && <p>{selected.note}</p>}
              <p>30 g &middot; CHF 3.49</p>
              <p className="availability">
                Online ordering is not available yet.
              </p>
            </div>
          </div>
        )}
      </dialog>
    </main>
  );
}
