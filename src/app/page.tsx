export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">Hand-stretched · Oven-fired · Made fresh</div>
          <h1>
            Good food.<span>Great mood.</span>
          </h1>
          <p className="hero-copy">
            Big flavour, generous toppings, and a whole lot of love in every box. Your new favourite
            local takeaway is just a few clicks away.
          </p>
          <div className="hero-actions">
            <a href="/menu" className="button-primary">
              Explore the menu <span aria-hidden="true">→</span>
            </a>
            <a href="#story" className="button-secondary">
              Why Ali Baba?
            </a>
          </div>
        </div>
        <div className="pizza-art" aria-hidden="true">
          🍕
        </div>
      </section>
      <div className="trust-bar">
        <div className="trust-item">
          ⚡ <strong>Fast delivery</strong> to your door
        </div>
        <div className="trust-item">
          ★ <strong>4.8/5</strong> happy customers
        </div>
        <div className="trust-item">
          ✦ <strong>Freshly made</strong> every time
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">What are you craving?</div>
            <h2>Pick your favourite</h2>
          </div>
          <a className="text-link" href="/menu">
            See full menu →
          </a>
        </div>
        <div className="category-grid">
          <a className="category-card" href="/menu">
            <div className="category-icon">🍕</div>
            <h3>Pizza</h3>
            <p>Classic and loaded</p>
          </a>
          <a className="category-card" href="/menu">
            <div className="category-icon">🍔</div>
            <h3>Burgers</h3>
            <p>Stacked with flavour</p>
          </a>
          <a className="category-card" href="/menu">
            <div className="category-icon">🍗</div>
            <h3>Chicken</h3>
            <p>Crispy, juicy, tasty</p>
          </a>
          <a className="category-card" href="/menu">
            <div className="category-icon">🥤</div>
            <h3>Drinks &amp; sides</h3>
            <p>Make it a feast</p>
          </a>
        </div>
      </section>
      <section className="feature-band" id="story">
        <div>
          <div className="eyebrow">The Ali Baba promise</div>
          <h2>
            Made for sharing.
            <br />
            Hard to share.
          </h2>
          <p>
            We believe the best meals are the ones that bring people together. That is why we use
            quality ingredients, bold recipes, and a little bit of magic in every order.
          </p>
          <div className="feature-list">
            <div>
              <span>✓</span> Fresh ingredients
            </div>
            <div>
              <span>✓</span> Big portions
            </div>
            <div>
              <span>✓</span> Local &amp; proud
            </div>
            <div>
              <span>✓</span> Always delicious
            </div>
          </div>
        </div>
        <div className="deal-card">
          <div>
            <small>Tonight&apos;s good idea</small>
            <h3>Any 2 pizzas for a tasty price</h3>
            <div className="deal-price">
              From £17.99 <s>£22.98</s>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
