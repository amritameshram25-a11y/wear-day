import Icon from './Icon.jsx'
import './StylingGuides.css'

const guides = [
  { title: '5 Casual Looks For Any Day', type: 'STYLE GUIDE', photo: 'photo-1483985988355-763728e1935b', position: 'center' },
  { title: 'Layering 101 Made Simple', type: 'STYLE GUIDE', photo: 'photo-1529139574466-a303027c1d8b', position: 'center 35%' },
  { title: 'From Work To Weekend', type: 'STYLE GUIDE', photo: 'photo-1524504388940-b1c1722653e1', position: 'center 38%' },
]

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
