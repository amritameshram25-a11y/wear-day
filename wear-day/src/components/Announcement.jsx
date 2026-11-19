import Icon from './Icon.jsx'
import './Announcement.css'

function Announcement() {
  return (
    <div className="announcement">
      <div className="announcement-inner">
        <span><Icon name="truck" size={15} /> Free shipping on orders over $75</span>
        <span className="announcement-center"><span className="announcement-stars">★★★★★</span> Loved by 20,000+ happy customers</span>
        <a href="#benefits">Easy 30-day returns <Icon name="arrow" size={14} /></a>
      </div>
    </div>
  )
}

export default Announcement
