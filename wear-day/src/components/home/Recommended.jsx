import Icon from '../shared/Icon.jsx'
import ProductCard from '../shared/ProductCard.jsx'
import '../../styles/components/Recommended.css'

import { products } from '../../data/recommended.js'

function Recommended({ onAddToCart, savedItems, onToggleSaved }) {
  return (
    <section className="recommended section-wrap" id="recommended">
      <div className="section-heading">
        <div><span className="eyebrow">Good things go together</span><h2>Recommended For You</h2></div>
        <a className="text-link" href="#categories">View all <Icon name="arrow" size={16} /></a>
      </div>
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.name} product={product} onAddToCart={onAddToCart} saved={savedItems.includes(product.name)} onToggleSaved={onToggleSaved} />)}
      </div>
    </section>
  )
}

export default Recommended
