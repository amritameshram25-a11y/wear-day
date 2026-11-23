import { useState } from "react";
import Icon from "./Icon.jsx";
import { getProduct, productImage } from "../../data/catalog.js";
import "../../styles/components/ProductCard.css";

function ProductCard({
  product: inputProduct,
  onAddToCart,
  saved,
  onToggleSaved,
}) {
  const product = getProduct(inputProduct);
  const [size, setSize] = useState("");
  if (!product) return null;
  const selectedSize =
    size ||
    product.defaultSize ||
    (product.sizes.includes("M") ? "M" : product.sizes[0]);
  return (
    <article className="product-card">
      <a
        className="product-image"
        href={`#/product/${product.id}`}
        aria-label={`View ${product.name}`}
      >
        <img src={productImage(product)} alt={product.name} loading="lazy" />
        {product.label && (
          <span className="product-badge">{product.label}</span>
        )}
      </a>
      <button
        className={`wishlist-button ${saved ? "is-saved" : ""}`}
        aria-pressed={saved}
        aria-label={
          saved
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
        onClick={() => onToggleSaved(product.name)}
      >
        <Icon name="heart" size={18} fill={saved ? "currentColor" : "none"} />
      </button>
      <div className="product-info">
        <span className="product-brand">WearDay</span>
        <div className="product-title-row">
          <h3>
            <a href={`#/product/${product.id}`}>{product.name}</a>
          </h3>
          <span>{product.price}</span>
        </div>
        {product.rating && (
          <div className="product-rating">
            <Icon name="star" size={12} fill="currentColor" /> {product.rating}{" "}
            <span>({product.reviews})</span>
          </div>
        )}
        <div className="product-swatches" aria-label="Available color palette">
          {product.colors.map((color, index) => (
            <i
              key={color}
              style={{ backgroundColor: color }}
              className={index === 0 ? "selected" : ""}
            />
          ))}
        </div>
        <label className="card-size">
          Size{" "}
          <select
            aria-label={`Size for ${product.name}`}
            value={selectedSize}
            onChange={(event) => setSize(event.target.value)}
          >
            {product.sizes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button
          className="product-add"
          onClick={() => onAddToCart(product, selectedSize)}
        >
          Add to Cart <Icon name="bag" size={14} />
        </button>
      </div>
    </article>
  );
}
export default ProductCard;
