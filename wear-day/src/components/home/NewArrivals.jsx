import { useState } from 'react'
import Icon from '../shared/Icon.jsx'
import ProductCard from '../shared/ProductCard.jsx'
import '../../styles/components/NewArrivals.css'

import { products } from '../../data/newArrivals.js'

function NewArrivals({ onAddToCart, savedItems, onToggleSaved }) {
  const [category, setCategory] = useState('All')
  const visibleProducts = category === 'All' ? products : products.filter((product) => product.category === category)

  return (
    <section className="new-arrivals section-wrap" id="new-arrivals">
      <div className="section-heading">
        <div><span className="eyebrow">Fresh from the studio</span><h2>New Arrivals</h2></div>
        <div className="arrival-controls">
          <div className="arrival-tabs" aria-label="Filter new arrivals">
            {['All', 'Men', 'Women', 'Unisex'].map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <a className="text-link" href="#recommended">View all <Icon name="arrow" size={16} /></a>
        </div>
      </div>
      <div className="product-grid">
        {visibleProducts.map((product) => <ProductCard key={product.name} product={product} onAddToCart={onAddToCart} saved={savedItems.includes(product.name)} onToggleSaved={onToggleSaved} />)}
      </div>
    </section>
  )
}

export default NewArrivals
