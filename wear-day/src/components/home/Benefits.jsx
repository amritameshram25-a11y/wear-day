import Icon from '../shared/Icon.jsx'
import '../../styles/components/Benefits.css'

import { benefits } from '../../data/benefits.js'

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
