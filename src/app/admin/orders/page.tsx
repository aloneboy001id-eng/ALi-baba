import Link from "next/link";

export default function AdminOrdersPage() {
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
        <div className="eyebrow">Live service</div>
        <h1>Orders</h1>
        <p className="admin-subtitle">Keep an eye on every order from confirmation to delivery.</p>
        <div className="toolbar">
          <h2>Today · 24 orders</h2>
          <button className="button-secondary">Refresh ↻</button>
        </div>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>#1042</strong>
                  <br />
                  <small>12:42 PM</small>
                </td>
                <td>
                  Jamie T.
                  <br />
                  <small>Delivery</small>
                </td>
                <td>2 items</td>
                <td>£19.97</td>
                <td>
                  <span className="pill pending">Preparing</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/orders">
                    Open
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>#1041</strong>
                  <br />
                  <small>12:36 PM</small>
                </td>
                <td>
                  Morgan L.
                  <br />
                  <small>Delivery</small>
                </td>
                <td>2 items</td>
                <td>£16.48</td>
                <td>
                  <span className="pill pending">New</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/orders">
                    Open
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>#1040</strong>
                  <br />
                  <small>12:21 PM</small>
                </td>
                <td>
                  Sam R.
                  <br />
                  <small>Collection</small>
                </td>
                <td>2 items</td>
                <td>£19.98</td>
                <td>
                  <span className="pill">Ready</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/orders">
                    Open
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>#1039</strong>
                  <br />
                  <small>12:08 PM</small>
                </td>
                <td>
                  Taylor K.
                  <br />
                  <small>Delivery</small>
                </td>
                <td>3 items</td>
                <td>£28.47</td>
                <td>
                  <span className="pill">Out for delivery</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/orders">
                    Open
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mobile-table-note">Swipe horizontally to view all columns.</p>
      </div>
    </main>
  );
}
