import Icon from '../shared/Icon.jsx'
import '../../styles/components/MobileNav.css'

import { items } from '../../data/mobileNav.js'

function MobileNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Quick navigation">
      {items.map((item) => (
        <a href={item.href} key={item.label}>
          <Icon name={item.icon} size={22} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

export default MobileNav
