import Link from "next/link";

export default function AdminMenuPage() {
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
        <div className="eyebrow">Catalog management</div>
        <h1>Menu items</h1>
        <p className="admin-subtitle">Keep your menu fresh and your customers hungry.</p>
        <div className="toolbar">
          <h2>6 items · All categories</h2>
          <button className="button-primary">+ Add item</button>
        </div>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Ali Baba Special</strong>
                </td>
                <td>Pizza</td>
                <td>£11.99</td>
                <td>
                  <span className="pill">Available</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/menu">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Margherita</strong>
                </td>
                <td>Pizza</td>
                <td>£8.99</td>
                <td>
                  <span className="pill">Available</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/menu">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>BBQ Chicken</strong>
                </td>
                <td>Pizza</td>
                <td>£10.99</td>
                <td>
                  <span className="pill">Available</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/menu">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Big Baba Burger</strong>
                </td>
                <td>Burgers</td>
                <td>£9.49</td>
                <td>
                  <span className="pill">Available</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/menu">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Hot Wings</strong>
                </td>
                <td>Chicken</td>
                <td>£6.49</td>
                <td>
                  <span className="pill pending">Sold out</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/menu">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Churros &amp; Dip</strong>
                </td>
                <td>Sides</td>
                <td>£4.49</td>
                <td>
                  <span className="pill">Available</span>
                </td>
                <td>
                  <a className="table-action" href="/admin/menu">
                    Edit
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
