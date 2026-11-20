import Announcement from './components/layout/Announcement.jsx'
import { useState } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Hero from './components/home/Hero.jsx'
import Categories from './components/home/Categories.jsx'
import OutfitBuilder from './components/home/OutfitBuilder.jsx'
import NewArrivals from './components/home/NewArrivals.jsx'
import StylingGuides from './components/home/StylingGuides.jsx'
import Benefits from './components/home/Benefits.jsx'
import Recommended from './components/home/Recommended.jsx'
import Footer from './components/layout/Footer.jsx'
import MobileNav from './components/layout/MobileNav.jsx'
import './styles/App.css'

function App() {
  const [cartCount, setCartCount] = useState(0)
  const [savedItems, setSavedItems] = useState([])

  const addToCart = () => setCartCount((count) => count + 1)
  const toggleSaved = (name) => {
    setSavedItems((items) => items.includes(name)
      ? items.filter((item) => item !== name)
      : [...items, name])
  }

  return (
    <>
      <Announcement />
      <Navbar cartCount={cartCount} />
      <main>
        <Hero />
        <Categories />
        <OutfitBuilder />
        <NewArrivals onAddToCart={addToCart} savedItems={savedItems} onToggleSaved={toggleSaved} />
        <StylingGuides />
        <Benefits />
        <Recommended onAddToCart={addToCart} savedItems={savedItems} onToggleSaved={toggleSaved} />
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}

export default App
