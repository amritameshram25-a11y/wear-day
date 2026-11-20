import Icon from './Icon.jsx'
import '../../styles/components/ProductCard.css'

function ProductCard({ product, onAddToCart, saved, onToggleSaved }) {
  return (
    <article className="product-card">
      <a className="product-image" href="#outfit-builder" aria-label={`View ${product.name}`}>
        <img src={`https://images.unsplash.com/${product.photo}?auto=format&fit=crop&w=700&q=85`} alt={product.name} />
        {product.label && <span className="product-badge">{product.label}</span>}
      </a>
      <button className={`wishlist-button ${saved ? 'is-saved' : ''}`} aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => onToggleSaved(product.name)}>
        <Icon name="heart" size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>
      <div className="product-info">
        <div className="product-title-row"><h3>{product.name}</h3><span>{product.price}</span></div>
        {product.rating && <div className="product-rating"><Icon name="star" size={12} fill="currentColor" /> {product.rating} <span>({product.reviews})</span></div>}
        <div className="product-swatches" aria-label={`Available colors: ${product.colors.join(', ')}`}>
          {product.colors.map((color, index) => <i key={color} title={color} style={{ backgroundColor: color }} className={index === 0 ? 'selected' : ''} />)}
        </div>
        <button className="product-add" onClick={onAddToCart}>Add to bag <span>+</span></button>
      </div>
    </article>
  )
}

export default ProductCard
