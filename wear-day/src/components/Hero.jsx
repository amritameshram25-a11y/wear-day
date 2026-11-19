import Icon from './Icon.jsx'
import './Hero.css'

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <span className="eyebrow">Thoughtful everyday essentials</span>
        <h1>Everyday<br />Looks. Made<br /><em>Effortless.</em></h1>
        <p>Practical pieces. Real comfort.<br />For every part of your day.</p>
        <div className="hero-buttons">
          <a className="button button-dark" href="#new-arrivals">Shop Now</a>
          <a className="button button-light" href="#categories">New In</a>
        </div>
      </div>
      <div className="hero-image">
        <picture>
          <source media="(max-width: 760px)" srcSet="/images/orve-reference-hero.jpg" />
          <img src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=85" alt="People enjoying a sunny afternoon outdoors" />
        </picture>
      </div>
      <div className="hero-shipping">
        <span><Icon name="truck" size={13} /> Free shipping</span>
        <small>on orders $75+</small>
        <span><Icon name="return" size={13} /> Easy returns</span>
        <small>30-day returns</small>
      </div>
      <div className="hero-dots" aria-hidden="true"><i /><i /><i /></div>
    </section>
  )
}

export default Hero

