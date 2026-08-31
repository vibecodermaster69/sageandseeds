const products = [
  { 
    name: "HIMALAYAN\nPINK SALT", 
    copy: "Simple. Clean.\nClassic.", 
    tone: "pink", 
    note: "Himalayan Pink Salt",
    img: "/images/himalayan-pink-salt-studio.jpg"
  },
  { 
    name: "CLASSIC\nSALT & PEPPER", 
    copy: "A timeless favourite\nwith a little more kick.", 
    tone: "cream", 
    note: "Classic Salt & Pepper",
    img: "/images/classic-salt-pepper-studio.jpg"
  },
  { 
    name: "INDIAN\nMASALA", 
    copy: "For the true\nadventurous seeker.", 
    tone: "orange", 
    note: "Indian Masala",
    img: "/images/indian-masala-studio.jpg"
  },
  { 
    name: "CACAO\nCRUNCH", 
    copy: "Naturally sweet.\nA treat with soul.", 
    tone: "brown", 
    note: "Cacao Crunch",
    img: "/images/cacao-crunch-studio.jpg"
  },
];

function Logo() {
  return <div className="logo">SAGE<br /><span>&amp;</span><br />SEEDS</div>;
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="header">
        <nav className="nav nav-left">
          <a href="#shop">SHOP</a>
          <a href="#story">OUR STORY</a>
          <a href="#makhana">WHAT IS MAKHANA?</a>
        </nav>
        <a className="logo-link" href="#top" aria-label="Sage and Seeds home">
          <Logo />
        </a>
        <nav className="nav nav-right">
          <a href="#journal">JOURNAL</a>
          <button className="icon-button" aria-label="Search">
            <svg className="icon-search" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="bag" aria-label="Shopping bag">
            <svg className="icon-bag" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </button>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">MINDFUL SNACKING <i>•</i> ROOTED IN INDIA</p>
          <h1>Mindful snacking<br />rooted in tradition.</h1>
          <p className="lead">Water Lily Pops, locally known as “Makhana”, are a traditional Indian snack that has been enjoyed for generations and is now finding its way to tables around the world.</p>
          <p className="lead">Sage &amp; Seeds brings this beautiful, ancient ingredient to busy and beyond — reimagined for modern, mindful snacking.</p>
          <a className="button" href="#shop">SHOP MAKHANA</a>
        </div>
        <div className="hero-visual">
          <img 
            src="/images/hero-visual.jpg" 
            alt="Sage &amp; Seeds Makhana Bowl and Masala Pack" 
            className="hero-img" 
          />
          <svg className="hero-curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0 0 L 75 0 C 55 25, 45 50, 65 75 C 75 85, 80 95, 85 100 L 0 100 Z" />
          </svg>
        </div>
      </section>

      <section className="mindset" id="story">
        <h2>Not a<br />demographic.<br />A mindset.</h2>
        <div className="mindset-col">
          <p>For busy professionals, parents looking for better choices, or anyone who simply loves flavour and wellness. We’re here to redefine snacking with thoughtful alternatives to today’s processed snacks.</p>
        </div>
        <div className="mindset-col">
          <p>Different path. Better thinking.<br />One conscious choice to do well by making better choices, without compromising on enjoyment.</p>
        </div>
      </section>

      <section className="flavours" id="shop">
        <h2>Four flavours. One wholesome snack.</h2>
        <p className="section-subtitle">Designed as an individual serving of Makhana.</p>
        
        <div className="product-grid">
          {products.map((product) => (
            <article className="product" key={product.name}>
              <div className="product-image-container">
                <img 
                  src={product.img} 
                  alt={`${product.note} packaging`} 
                  className="product-pouch-img"
                />
              </div>
              <div className="product-info">
                <h3>{product.name.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                <p>{product.copy.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
                <div className="price">30g <b>•</b> CHF 3.49</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="service-strip" id="journal">
        <div className="review">
          <p className="mini-label">WHAT OUR CUSTOMERS SAY</p>
          <blockquote>“Customer review goes here.”</blockquote>
          <small>— Customer name</small>
          <div className="dots">●　○　○</div>
        </div>
        
        <div className="delivery">
          <div className="delivery-icon-container">
            <svg className="icon-truck" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <div className="delivery-heading">
            <p className="mini-label">DELIVERY</p>
            <h2>We currently ship<br />directly to you.</h2>
          </div>
          <div className="delivery-copy">
            <p>For orders, updates, estimated<br />shipping cost and adds at checkout.</p>
          </div>
        </div>
      </section>

      <footer className="values">
        <div className="value-item">
          <svg className="value-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22C12 22 17 18 17 13C17 8 12 2 12 2C12 2 7 8 7 13C7 18 12 22 12 22Z" />
            <path d="M12 2V22" />
            <path d="M12 14C14.5 13 16 11 16 11" />
            <path d="M12 11C9.5 10 8 8 8 8" />
          </svg>
          <span>HONEST<br />INGREDIENTS</span>
        </div>
        <div className="value-item">
          <svg className="value-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18" />
            <path d="M5 21V10h14v11" />
            <path d="M2 10l10-7 10 7" />
            <path d="M9 21v-5h6v5" />
            <path d="M9 10h6" />
            <path d="M7 14h2" />
            <path d="M15 14h2" />
          </svg>
          <span>ROOTED IN<br />TRADITION</span>
        </div>
        <div className="value-item">
          <svg className="value-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20a8 8 0 0 0 8-8c0-4.4-3.6-8-8-8s-8 3.6-8 8a8 8 0 0 0 8 8Z" style={{ opacity: 0.15 }} />
            <path d="M12 7.5C12.5 6 15 5.5 16 7C17 8.5 15.5 11 12 13.5C8.5 11 7 8.5 8 7C9 5.5 11.5 6 12 7.5Z" />
            <path d="M2 13c1.5 1 4 .5 5-1.5" />
            <path d="M22 13c-1.5 1-4 .5-5-1.5" />
            <path d="M7 16c2 3 5 4.5 5 4.5s3-1.5 5-4.5" />
          </svg>
          <span>MADE WITH<br />CARE</span>
        </div>
        <div className="value-item">
          <svg className="value-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span>BETTER CHOICES,<br />EVERY DAY.</span>
        </div>
      </footer>
    </main>
  );
}
