import Icon from './Icon.jsx'
import ProductCard from './ProductCard.jsx'
import './Recommended.css'

const products = [
  { name: 'Basic Crew Neck Tee', price: '$12.99', photo: 'photo-1521572163474-6864f9cf17ab', rating: '4.9', reviews: 51, colors: ['#9a967d', '#ddd6c9', '#35483a'] },
  { name: 'Slim Fit Jeans', price: '$49.99', photo: 'photo-1541099649105-f69ad21f3246', rating: '4.8', reviews: 34, colors: ['#626f59', '#c4b8a4'] },
  { name: 'Canvas Tote Bag', price: '$24.99', photo: 'photo-1544816155-12df9643f363', rating: '4.9', reviews: 68, colors: ['#e1ded4', '#929b8c', '#333b35'] },
  { name: 'Everyday Cap', price: '$14.99', photo: 'photo-1521369909029-2afed882baee', rating: '4.7', reviews: 42, colors: ['#ece8df', '#68796b'] },
  { name: 'White Sneakers', price: '$69.99', photo: 'photo-1600185365483-26d7a4cc7519', rating: '4.8', reviews: 27, colors: ['#d7c8ad', '#303c31'] },
]

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
