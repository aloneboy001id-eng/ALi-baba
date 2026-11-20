import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="admin-shell">
      <div className="admin-header">
        <div className="admin-title">
          Ali Baba <span>Restaurant console</span>
        </div>
        <nav className="admin-nav">
          <a href="/admin">Overview</a>
          <a href="/admin/orders">Orders</a>
          <a href="/admin/menu">Menu</a>
          <Link href="/">View shop ↗</Link>
        </nav>
      </div>
      <div className="admin-content">
        <div className="eyebrow">Friday, 20 November</div>
        <h1>Good morning, team.</h1>
        <p className="admin-subtitle">Here&apos;s how Ali Baba is doing today.</p>
        <div className="stats-grid">
          <div className="stat-card">
            <small>Orders today</small>
            <strong>24</strong>
            <span className="positive">↑ 12% vs last Friday</span>
          </div>
          <div className="stat-card">
            <small>Revenue today</small>
            <strong>£428</strong>
            <span className="positive">↑ 8% vs last Friday</span>
          </div>
          <div className="stat-card">
            <small>Avg. order value</small>
            <strong>£17.83</strong>
            <span className="positive">↑ 4% this week</span>
          </div>
          <div className="stat-card">
            <small>Open orders</small>
            <strong>6</strong>
            <span className="positive">All on track</span>
          </div>
        </div>
        <div className="admin-panels">
          <section className="admin-panel">
            <h2>Latest orders</h2>
            <div className="order-row">
              <div className="order-icon">🍕</div>
              <div>
                <h3>#1042 · Jamie T.</h3>
                <p>Ali Baba Special, Loaded fries · £19.97</p>
              </div>
              <span className="status">Preparing</span>
            </div>
            <div className="order-row">
              <div className="order-icon">🍔</div>
              <div>
                <h3>#1041 · Morgan L.</h3>
                <p>Big Baba Burger, Wings · £16.48</p>
              </div>
              <span className="status">New order</span>
            </div>
            <div className="order-row">
              <div className="order-icon">🍕</div>
              <div>
                <h3>#1040 · Sam R.</h3>
                <p>2 × Margherita · £19.98</p>
              </div>
              <span className="status">Ready</span>
            </div>
            <a className="text-link" href="/admin/orders">
              View all orders →
            </a>
          </section>
          <section className="admin-panel">
            <h2>Quick actions</h2>
            <div className="quick-links">
              <a className="quick-link" href="/admin/menu">
                Update menu <span>→</span>
              </a>
              <a className="quick-link" href="/admin/orders">
                Manage live orders <span>→</span>
              </a>
              <a className="quick-link" href="/menu">
                Preview customer menu <span>→</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
