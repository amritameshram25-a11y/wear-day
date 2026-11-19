import { useState } from 'react'
import Icon from './Icon.jsx'
import './Footer.css'

const footerGroups = [
  { title: 'Shop', links: [['Shop all', '#categories'], ['New arrivals', '#new-arrivals'], ['Best sellers', '#recommended'], ['Build your outfit', '#outfit-builder']] },
  { title: 'Collections', links: [['The everyday edit', '#categories'], ['Soft layers', '#categories'], ['Denim days', '#categories'], ['Gifts for them', '#categories']] },
  { title: 'Customer care', links: [['Shipping & delivery', '#benefits'], ['Returns & exchanges', '#benefits'], ['FAQs', '#benefits'], ['Get in touch', '#benefits']] },
  { title: 'Our world', links: [['Our story', '#home'], ['The journal', '#styling-guides'], ['Materials & care', '#benefits'], ['Find your fit', '#categories']] },
]

function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (event) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="footer-top">
          <div className="footer-newsletter" id="newsletter">
            <a className="footer-wordmark" href="#home">ORVE<span>.</span></a>
            <h2>A little good in your inbox.</h2>
            <p>New things, thoughtful notes, and 10% off your first order. Only the good stuff.</p>
            {subscribed ? <p className="subscribe-success"><Icon name="check" size={16} /> You're on the list. Welcome to ORVE!</p> : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
                <input id="newsletter-email" type="email" placeholder="Your email address" required />
                <button aria-label="Subscribe to newsletter"><Icon name="arrow" size={19} /></button>
              </form>
            )}
            <div className="social-links" aria-label="Social media">
              <a href="https://www.instagram.com/" aria-label="Instagram"><Icon name="instagram" size={17} /></a>
              <a href="https://www.facebook.com/" aria-label="Facebook"><Icon name="facebook" size={17} /></a>
              <a href="https://www.pinterest.com/" aria-label="Pinterest"><Icon name="pinterest" size={17} /></a>
            </div>
          </div>
          <div className="footer-links">
            {footerGroups.map((group) => (
              <div className="footer-link-group" key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ORVE. Made for every day.</span>
          <div className="payment-methods"><span>WE ACCEPT</span><b>VISA</b><b>mastercard</b><b>AMEX</b><b>PayPal</b></div>
          <label className="currency-select"><span className="sr-only">Country and currency</span><select defaultValue="US / USD"><option>US / USD</option><option>CA / CAD</option><option>UK / GBP</option><option>EU / EUR</option></select></label>
        </div>
        <div className="footer-legal"><a href="#home">Privacy</a><a href="#home">Terms</a><span>Designed to be worn on repeat.</span></div>
      </div>
    </footer>
  )
}

export default Footer
