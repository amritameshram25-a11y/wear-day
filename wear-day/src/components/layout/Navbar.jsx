import { useState } from 'react'
import Icon from '../shared/Icon.jsx'
import '../../styles/components/Navbar.css'

import { links } from '../../data/navbar.js'

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState('')

  return (
    <header className="site-header">
      <div className="navbar section-wrap">
        <button className="mobile-menu-button icon-button" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        <a className="wordmark" href="#home" aria-label="WearDay home"><span className="brand-icon"><Icon name="bag" size={28} /></span><span>WearDay<small>Everyday essentials</small></span></a>
        <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <div className="nav-item" key={link.label}>
              <a href={link.href} onClick={() => { setMenuOpen(false); setActiveDropdown('') }}>
                {link.label}
              </a>
              {link.menu && (
                <button className="nav-dropdown-toggle" aria-label={`Open ${link.label} menu`} aria-expanded={activeDropdown === link.label} onClick={() => setActiveDropdown(activeDropdown === link.label ? '' : link.label)}>
                  <span className="nav-chevron">⌄</span>
                </button>
              )}
              {link.menu && <div className={`nav-dropdown ${activeDropdown === link.label ? 'dropdown-open' : ''}`}>
                {link.menu.map((item) => <a key={item} href={link.href} onClick={() => { setMenuOpen(false); setActiveDropdown('') }}>{item}</a>)}
              </div>}
            </div>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-button search-action" aria-label="Search products" onClick={() => document.querySelector('#new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}><Icon name="search" /></button>
          <button className="icon-button account-action" aria-label="Account"><Icon name="user" /></button>
          <button className="icon-button cart-action" aria-label={`Shopping bag, ${cartCount} items`}><Icon name="bag" /><span className="cart-count">{cartCount}</span></button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
