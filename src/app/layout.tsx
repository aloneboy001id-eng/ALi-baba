import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ali Baba Pizza",
  description: "Fresh, hot pizza made with love at Ali Baba Pizza.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Ali Baba Pizza home">
            <span className="brand-mark">✦</span>
            <span className="brand-name">
              Ali Baba<span>PIZZA &amp; GRILL</span>
            </span>
          </Link>
          <nav className="nav">
            <a href="/menu">Menu</a>
            <Link href="/#story">Our story</Link>
            <a href="/cart" className="order-button">
              Order now <span aria-hidden="true">→</span>
            </a>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <div className="footer-inner">
            <div className="brand">
              <span className="brand-mark">✦</span>
              <span className="brand-name">
                Ali Baba<span>PIZZA &amp; GRILL</span>
              </span>
            </div>
            <p>
              Fresh food. Big flavour. Good times.
              <br />
              Open every day · 11am — 11pm
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
