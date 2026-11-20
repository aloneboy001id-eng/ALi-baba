export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <span className="brand-mark">✦</span>
          <span className="brand-name">
            Ali Baba<span>PIZZA &amp; GRILL</span>
          </span>
        </div>
        <div className="eyebrow">Restaurant team</div>
        <h1>Welcome back.</h1>
        <p>
          Sign in to manage today&apos;s orders, update the menu, and keep the good food moving.
        </p>
        <form action="/api/login" method="post">
          <div className="field">
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@alibaba-pizza.com"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="button-primary" type="submit">
            Sign in →
          </button>
        </form>
        <p className="helper-text">
          Staff access only. Need help? Speak to your restaurant manager.
        </p>
      </section>
    </main>
  );
}
