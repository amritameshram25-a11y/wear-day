import ProductCard from "../components/shared/ProductCard.jsx";
import { catalog } from "../data/catalog.js";
function WishlistPage({ savedItems, onToggleSaved, onAddToCart }) {
  const products = catalog.filter((product) =>
    savedItems.includes(product.name),
  );
  return (
    <div className="shopping-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span>/</span>
        <span>Wishlist</span>
      </nav>
      <div className="wishlist-heading">
        <div>
          <span className="shop-kicker">KEEP YOUR FAVORITES CLOSE</span>
          <h1>
            Your Wishlist <small>{products.length} items</small>
          </h1>
        </div>
        <a className="text-link" href="#/products">
          Keep exploring →
        </a>
      </div>
      {products.length ? (
        <div className="listing-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              saved
              onToggleSaved={onToggleSaved}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="shop-empty">
          <h2>A little room for your favorites</h2>
          <p>Tap a heart on any product to save it here.</p>
          <a className="button button-dark" href="#/products">
            Find Your Favorites
          </a>
        </div>
      )}
    </div>
  );
}
export default WishlistPage;
