export default function CartPage() {
  return (
    <main className="cart-layout">
      <section>
        <div className="eyebrow">Almost there</div>
        <h1 className="page-title">Your basket</h1>
        <div className="cart-items">
          <div className="cart-item">
            <div className="mini-visual">🍕</div>
            <div>
              <h3>Ali Baba Special</h3>
              <p>Large · Extra cheese</p>
            </div>
            <span className="item-price">£13.99</span>
          </div>
          <div className="cart-item">
            <div className="mini-visual">🍟</div>
            <div>
              <h3>Loaded fries</h3>
              <p>1 × regular</p>
            </div>
            <span className="item-price">£3.99</span>
          </div>
        </div>
      </section>
      <aside className="summary-card">
        <h2>Order summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>£17.98</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>£1.99</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>£19.97</span>
        </div>
        <a href="/checkout" className="button-primary full-button">
          Continue to checkout →
        </a>
        <a href="/menu" className="text-link full-button">
          ← Add more items
        </a>
      </aside>
    </main>
  );
}
