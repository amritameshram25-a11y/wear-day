import { useState } from "react";
import Icon from "../shared/Icon.jsx";
import { footerGroups } from "../../data/footer.js";
import "../../styles/components/Footer.css";

function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = (event) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      <div className="newsletter-strip" id="newsletter">
        <Icon name="mail" size={34} />
        <div className="newsletter-copy">
          <strong>Stay in the loop</strong>
          <span>New arrivals and everyday inspiration.</span>
        </div>
        {subscribed ? (
          <p className="subscribe-success" role="status">
            You're on the list. Welcome to WearDay!
          </p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="newsletter-email">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <a className="wordmark" href="#home">
            <span className="brand-icon">
              <Icon name="bag" size={28} />
            </span>
            <span>
              WearDay<small>Everyday essentials</small>
            </span>
          </a>
          <p>
            Quality products, unmatched style,
            <br />
            and exceptional customer service.
            <br />
            That's our promise to you.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div className="footer-link-group" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        ))}
        <div className="footer-payments">
          <h3>Payment Methods</h3>
          <div
            className="payment-methods"
            aria-label="Visa, Mastercard, American Express, PayPal, Apple Pay and Shop Pay"
          >
            <b className="payment-visa">VISA</b>
            <b className="payment-mastercard">Mastercard</b>
            <b className="payment-amex">AMEX</b>
            <b className="payment-paypal">PayPal</b>
            <b>Apple Pay</b>
            <b className="payment-shop">shop Pay</b>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} WearDay. All rights reserved.</span>
        <label className="currency-select">
          <span className="sr-only">Country and currency</span>
          <select defaultValue="US / USD">
            <option>US / USD</option>
            <option>CA / CAD</option>
            <option>UK / GBP</option>
            <option>EU / EUR</option>
          </select>
        </label>
      </div>
    </footer>
  );
}
export default Footer;
