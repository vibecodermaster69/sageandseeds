"use client";

import { useRef, useState } from "react";
import Botanical from "./botanical";
import Packaging, { type PackKind } from "./packaging";
import { useMakhanaBurst } from "./use-makhana-burst";

const products = [
  {
    name: "HIMALAYAN\nPINK SALT",
    copy: "Simple. Clean.\nClassic.",
    tone: "pink",
    note: "Himalayan Pink Salt",
    kind: "pink" as PackKind,
  },
  {
    name: "CLASSIC\nSALT & PEPPER",
    copy: "A timeless favourite\nwith a little more kick.",
    tone: "cream",
    note: "Classic Salt & Pepper",
    kind: "classic" as PackKind,
  },
  {
    name: "INDIAN\nMASALA",
    copy: "For the true\nadventurous seeker.",
    tone: "orange",
    note: "Indian Masala",
    kind: "masala" as PackKind,
  },
  {
    name: "CACAO\nCRUNCH",
    copy: "Naturally sweet.\nA treat with soul.",
    tone: "brown",
    note: "Cacao Crunch",
    kind: "cacao" as PackKind,
  },
];

function Logo() {
  return (
    <div className="logo">
      SAGE
      <br />
      <span>&amp;</span>
      <br />
      SEEDS
    </div>
  );
}

export default function Home() {
  const popMakhana = useMakhanaBurst();
  const dialog = useRef<HTMLDialogElement>(null);
  const [panel, setPanel] = useState("search");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof products)[number] | null>(
    null,
  );
  function openPanel(name: string) {
    setPanel(name);
    dialog.current?.showModal();
  }

  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="header">
        <nav className="nav nav-left">
          <a href="#shop">SHOP</a>
          <a href="#story">OUR STORY</a>
          <button onClick={() => openPanel("makhana")}>WHAT IS MAKHANA?</button>
        </nav>
        <a className="logo-link" href="#top" aria-label="Sage and Seeds home">
          <Logo />
        </a>
        <nav className="nav nav-right">
          <button onClick={() => openPanel("journal")}>JOURNAL</button>
          <button
            className="icon-button"
            aria-label="Search"
            onClick={() => openPanel("search")}
          >
            <svg
              className="icon-search"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button
            className="bag"
            aria-label="Shopping bag"
            onClick={() => openPanel("bag")}
          >
            <svg
              className="icon-bag"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </nav>
      </header>

      <section className="hero" id="main-content">
        <div className="hero-copy">
          <p className="eyebrow">
            MINDFUL SNACKING <i>•</i> ROOTED IN INDIA
          </p>
          <h1>
            Mindful snacking
            <br />
            rooted in tradition.
          </h1>
          <p className="lead">
            Water Lily Pops, locally known as “Makhana”, are a traditional
            Indian snack that has been enjoyed for generations and is now
            finding its way to tables around the world.
          </p>
          <p className="lead">
            Sage &amp; Seeds brings this beautifully simple ingredient to Europe
            and beyond — reimagined for modern, mindful snacking.
          </p>
          <a className="button" href="#shop">
            SHOP MAKHANA
          </a>
        </div>
        <button
          className="hero-visual hero-scene-button"
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
            className="hero-img"
            fetchPriority="high"
            width="901"
            height="572"
          />
          <span className="pop-hint">Tap for a little crunch</span>
        </button>
      </section>

      <section className="mindset" id="story">
        <h2>
          Not a<br />
          demographic.
          <br />A mindset.
        </h2>
        <div className="mindset-col">
          <p>
            For busy professionals, parents looking for better choices, or
            anyone who simply loves flavour and wellness. We’re here to redefine
            snacking with thoughtful alternatives to today’s processed snacks.
          </p>
        </div>
        <div className="mindset-col">
          <p>
            Different path. Better thinking.
            <br />
            One conscious choice to do well by making better choices, without
            compromising on enjoyment.
          </p>
        </div>
        <Botanical />
      </section>

      <section className="flavours" id="shop">
        <h2>Four flavours. One wholesome snack.</h2>
        <p className="section-subtitle">
          Designed as an individual serving of Makhana.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product" key={product.name}>
              <button
                className="product-image-container"
                aria-label={`View ${product.note}`}
                onClick={(event) => {
                  const origin = event.currentTarget.getBoundingClientRect();
                  setSelected(product);
                  openPanel("product");
                  popMakhana(origin);
                }}
              >
                <Packaging
                  kind={product.kind}
                  label={`${product.note} lifestyle photograph`}
                  className="product-pouch-img"
                />
              </button>
              <div className="product-info">
                <h3>
                  {product.name.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h3>
                <p>
                  {product.copy.split("\n").map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                <div className="price">
                  30g <b>•</b> CHF 3.49
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="service-strip" id="journal">
        <div className="review">
          <p className="mini-label">WHAT OUR CUSTOMERS SAY</p>
          <blockquote>
            “Absolutely love these makhanas—light, crunchy, delicious and
            satisfyingly filling! The variety of flavours is amazing, and my
            kids love them too—a much healthier alternative to regular chips.
            They’re perfect for satisfying those post-workout hunger pangs
            without the guilt!”
          </blockquote>
          <small>— Nidhi</small>
        </div>

        <div className="delivery">
          <div className="delivery-icon-container">
            <svg
              className="icon-truck"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <div className="delivery-heading">
            <p className="mini-label">DELIVERY</p>
            <h2>
              We currently ship
              <br />
              directly to you.
            </h2>
          </div>
          <div className="delivery-copy">
            <p>
              For subsequent orders, standard
              <br />
              shipping costs are added at checkout.
            </p>
          </div>
        </div>
      </section>

      <footer className="values">
        <div className="value-item">
          <svg
            className="value-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22C12 22 17 18 17 13C17 8 12 2 12 2C12 2 7 8 7 13C7 18 12 22 12 22Z" />
            <path d="M12 2V22" />
            <path d="M12 14C14.5 13 16 11 16 11" />
            <path d="M12 11C9.5 10 8 8 8 8" />
          </svg>
          <span>
            HONEST
            <br />
            INGREDIENTS
          </span>
        </div>
        <div className="value-item">
          <svg
            className="value-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21h18" />
            <path d="M5 21V10h14v11" />
            <path d="M2 10l10-7 10 7" />
            <path d="M9 21v-5h6v5" />
            <path d="M9 10h6" />
            <path d="M7 14h2" />
            <path d="M15 14h2" />
          </svg>
          <span>
            ROOTED IN
            <br />
            TRADITION
          </span>
        </div>
        <div className="value-item">
          <svg
            className="value-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M12 20a8 8 0 0 0 8-8c0-4.4-3.6-8-8-8s-8 3.6-8 8a8 8 0 0 0 8 8Z"
              style={{ opacity: 0.15 }}
            />
            <path d="M12 7.5C12.5 6 15 5.5 16 7C17 8.5 15.5 11 12 13.5C8.5 11 7 8.5 8 7C9 5.5 11.5 6 12 7.5Z" />
            <path d="M2 13c1.5 1 4 .5 5-1.5" />
            <path d="M22 13c-1.5 1-4 .5-5-1.5" />
            <path d="M7 16c2 3 5 4.5 5 4.5s3-1.5 5-4.5" />
          </svg>
          <span>
            MADE WITH
            <br />
            CARE
          </span>
        </div>
        <div className="value-item">
          <svg
            className="value-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span>
            BETTER CHOICES,
            <br />
            EVERY DAY.
          </span>
        </div>
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
            <p className="eyebrow">FIND YOUR FLAVOUR</p>
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
                  p.note.toLowerCase().includes(query.toLowerCase()),
                )
                .map((p) => (
                  <button
                    key={p.note}
                    onClick={() => {
                      setSelected(p);
                      setPanel("product");
                    }}
                  >
                    {p.note}
                    <span>CHF 3.49 &rarr;</span>
                  </button>
                ))}
              {!products.some((p) =>
                p.note.toLowerCase().includes(query.toLowerCase()),
              ) && <p>No flavours found. Try another search.</p>}
            </div>
          </>
        )}
        {panel === "makhana" && (
          <>
            <p className="eyebrow">ROOTED IN INDIA</p>
            <h2>Meet Makhana.</h2>
            <p>
              Makhana is the seed of the water lily &mdash; a traditional Indian
              food that has been enjoyed for generations.
            </p>
            <p>
              Cultivated in ponds and lakes, particularly across eastern India,
              it is carefully cleaned, dried, roasted and popped into a
              delicate, crunchy snack.
            </p>
            <a
              className="button"
              href="#shop"
              onClick={() => dialog.current?.close()}
            >
              EXPLORE THE FLAVOURS
            </a>
          </>
        )}
        {panel === "journal" && (
          <>
            <p className="eyebrow">THE JOURNAL</p>
            <h2>
              More than a snack.
              <br />A labour of love.
            </h2>
            <p>
              What looks simple in a packet has a remarkable amount of work
              behind it.
            </p>
            <p>
              Makhana is traditionally harvested from water and goes through a
              careful process of cleaning, drying, roasting and popping. The
              process relies on human skill, patience and care.
            </p>
            <p>
              Even the occasional natural dark mark on a Makhana pop can be part
              of the traditional popping process.
            </p>
          </>
        )}
        {panel === "bag" && (
          <>
            <p className="eyebrow">YOUR SHOPPING BAG</p>
            <h2>A little goodness awaits.</h2>
            <p>Your bag is empty. Online ordering is not available yet.</p>
            <a
              className="button"
              href="#shop"
              onClick={() => dialog.current?.close()}
            >
              EXPLORE THE FLAVOURS
            </a>
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
                label={selected.note + " lifestyle photograph"}
                className="detail-pack"
              />
            </button>
            <div>
              <p className="eyebrow">PUFFED LILY POPS</p>
              <h2>{selected.note}</h2>
              <p>{selected.copy.replaceAll("\n", " ")}</p>
              {selected.tone === "brown" && (
                <p>Contains milk powder. Not vegan.</p>
              )}
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
