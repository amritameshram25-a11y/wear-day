import Icon from '../shared/Icon.jsx'
import '../../styles/components/StylingGuides.css'

import { guides } from '../../data/stylingGuides.js'

function StylingGuides() {
  return (
    <section className="styling-guides section-wrap" id="styling-guides">
      <div className="section-heading">
        <div><span className="eyebrow">A few ideas to get you dressed</span><h2>Styling Guides</h2></div>
        <a className="text-link" href="#styling-guides">Explore all <Icon name="arrow" size={16} /></a>
      </div>
      <div className="guide-grid">
        {guides.map((guide) => (
          <a className="guide-card" href="#styling-guides" key={guide.title}>
            <div className="guide-image"><img src={`https://images.unsplash.com/${guide.photo}?auto=format&fit=crop&w=800&q=80`} alt="" style={{ objectPosition: guide.position }} /><span className="guide-read">Read Guide <Icon name="arrow" size={15} /></span></div>
            <span className="guide-type">{guide.type}</span>
            <h3>{guide.title}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}

export default StylingGuides
