import Icon from './Icon.jsx'
import './MobileNav.css'

const items = [
  { label: 'Home', href: '#home', icon: 'user' },
  { label: 'Categories', href: '#categories', icon: 'grid' },
  { label: 'Deals', href: '#new-arrivals', icon: 'tag' },
  { label: 'Wishlist', href: '#recommended', icon: 'heart' },
  { label: 'Account', href: '#newsletter', icon: 'user' },
]

function MobileNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Quick navigation">
      {items.map((item) => (
        <a href={item.href} key={item.label}>
          <Icon name={item.icon} size={10} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

export default MobileNav
