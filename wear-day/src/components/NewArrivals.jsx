import { useState } from 'react'
import Icon from './Icon.jsx'
import ProductCard from './ProductCard.jsx'
import './NewArrivals.css'

const products = [
  { name: 'Relaxed Fit Tee', price: '$29.99', photo: 'photo-1521572163474-6864f9cf17ab', label: 'Just in', rating: '4.9', reviews: 28, colors: ['#d3d7c8', '#e9e3d6', '#333b32'], category: 'Men' },
  { name: 'Linen Blend Shirt', price: '$39.99', photo: 'photo-1598033129183-c4f50c736f10', rating: '4.8', reviews: 46, colors: ['#eeece3', '#7f8978', '#292d2a'], category: 'Women' },
  { name: 'Easy Chino Pants', price: '$39.99', photo: 'photo-1473966968600-fa801b869a1a', label: 'Bestseller', rating: '5.0', reviews: 19, colors: ['#697d8b', '#a8a398'], category: 'Unisex' },
  { name: 'Everyday Hoodie', price: '$49.99', photo: 'photo-1556821840-3a63f95609a7', rating: '4.9', reviews: 32, colors: ['#d2cab8', '#4b5c4d', '#a18c7c'], category: 'Men' },
  { name: 'Denim Jacket', price: '$59.99', photo: 'photo-1591047139829-d91aecb6caea', rating: '4.8', reviews: 21, colors: ['#8392a0', '#485b6c'], category: 'Women' },
]

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
