import { useState } from 'react'
import Announcement from './components/Announcement.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Categories from './components/Categories.jsx'
import OutfitBuilder from './components/OutfitBuilder.jsx'
import NewArrivals from './components/NewArrivals.jsx'
import StylingGuides from './components/StylingGuides.jsx'
import Benefits from './components/Benefits.jsx'
import Recommended from './components/Recommended.jsx'
import Footer from './components/Footer.jsx'
import MobileNav from './components/MobileNav.jsx'
import './App.css'

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
