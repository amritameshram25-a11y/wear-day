import Icon from './Icon.jsx'
import './Benefits.css'

const benefits = [
  { title: 'Great Quality', text: 'Loved by thousands', icon: 'star' },
  { title: 'Everyday Comfort', text: 'Designed for real life', icon: 'check' },
  { title: 'Easy Returns', text: 'No hassle, ever', icon: 'return' },
  { title: 'Secure Checkout', text: 'Shop with confidence', icon: 'lock' },
]

function Benefits() {
  return (
    <section className="benefits" id="benefits">
      <div className="section-wrap">
        <div className="benefits-heading"><h2>Customer Favorites</h2><a href="#recommended">View all <Icon name="arrow" size={13} /></a></div>
        <div className="benefits-inner">
          {benefits.map((benefit) => (
            <article className="benefit-item" key={benefit.title}>
              <span className="benefit-icon"><Icon name={benefit.icon} size={21} /></span>
              <div><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
