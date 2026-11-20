export default function CheckoutPage() {
  return (
    <main className="checkout-layout">
      <section>
        <div className="eyebrow">Just one more thing</div>
        <h1 className="page-title">Checkout</h1>
        <div className="form-card">
          <h2>Where should we bring it?</h2>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" placeholder="e.g. Alex Smith" />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" type="tel" placeholder="e.g. 07123 456789" />
          </div>
          <div className="field">
            <label htmlFor="address">Delivery address</label>
            <textarea id="address" placeholder="House number, street, postcode" />
          </div>
          <div className="field">
            <label htmlFor="notes">
              Notes for the kitchen{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input id="notes" placeholder="Any allergies or special requests?" />
          </div>
        </div>
      </section>
      <aside className="summary-card">
        <h2>Your order</h2>
        <div className="summary-row">
          <span>Ali Baba Special × 1</span>
          <span>£13.99</span>
        </div>
        <div className="summary-row">
          <span>Loaded fries × 1</span>
          <span>£3.99</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>£1.99</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>£19.97</span>
        </div>
        <button className="button-primary full-button">Place order →</button>
        <p
          style={{ color: "var(--muted)", fontSize: "12px", lineHeight: 1.5, textAlign: "center" }}
        >
          We will call or WhatsApp you to confirm your order.
        </p>
      </aside>
    </main>
  );
}
