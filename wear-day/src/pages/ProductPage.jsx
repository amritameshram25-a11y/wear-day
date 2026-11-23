import { useRef, useState } from "react";
import { getProduct, money, productImage } from "../data/catalog.js";
import { comboSize, shirtSizes, trouserSizes } from "../data/combos.js";
import Icon from "../components/shared/Icon.jsx";
import "../styles/ProductPage.css";

function ProductPage({ id, onAddToCart, onToggleSaved, savedItems }) {
  const product = getProduct(id);
  const [size, setSize] = useState("");
  const [shirtSize, setShirtSize] = useState("M");
  const [pantsSize, setPantsSize] = useState("32");
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const imageDialog = useRef(null);
  if (!product)
    return (
      <div className="shop-empty">
        <h1>Product not found</h1>
        <a className="button button-dark" href="#/products">
          Explore Products
        </a>
      </div>
    );
  const isCombo = product.type === "Combos";
  const selectedSize = isCombo
    ? comboSize(shirtSize, pantsSize)
    : size || (product.sizes.includes("M") ? "M" : product.sizes[0]);
  const saved = savedItems.includes(product.name);
  const description =
    product.description ||
    "An easy addition to your everyday wardrobe. Pair it with your favorites and make the look your own.";
  const image = productImage(product);
  return (
    <div className="product-landing">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span>/</span>
        <a
          href={
            isCombo
              ? "#combos"
              : product.gender === "Women"
                ? "#/women"
                : "#/men"
          }
        >
          {isCombo ? "Occasion Combos" : product.gender}
        </a>
        <span>/</span>
        <span>{product.name}</span>
      </nav>
      <div className="pdp-layout">
        <div className="pdp-gallery">
          <div className="pdp-thumbnails">
            <button
              className={!zoomed ? "is-active" : ""}
              aria-label="Show full product image"
              aria-pressed={!zoomed}
              onClick={() => setZoomed(false)}
            >
              <img src={image} alt="" />
            </button>
            <button
              className={zoomed ? "is-active" : ""}
              aria-label="Show closer product view"
              aria-pressed={zoomed}
              onClick={() => setZoomed(true)}
            >
              <span aria-hidden="true">＋</span>
              <small>Detail</small>
            </button>
          </div>
          <div className="pdp-image-area">
            <button
              className={`pdp-image-button ${zoomed ? "is-zoomed" : ""}`}
              aria-label={`Enlarge image of ${product.name}`}
              onClick={() => imageDialog.current?.showModal()}
            >
              <img
                src={image}
                alt={product.imageAlt || product.name}
                fetchPriority="high"
              />
            </button>
            <span className="pdp-image-caption">
              Click image to enlarge{isCombo ? " · All 3 pieces included" : ""}
            </span>
          </div>
          <dialog
            ref={imageDialog}
            className="product-image-dialog"
            aria-label={`Enlarged image of ${product.name}`}
            onClick={(event) => {
              if (event.target === event.currentTarget)
                imageDialog.current.close();
            }}
          >
            <button
              className="image-dialog-close"
              aria-label="Close enlarged image"
              onClick={() => imageDialog.current.close()}
            >
              <Icon name="close" />
            </button>
            <img src={image} alt={product.imageAlt || product.name} />
          </dialog>
        </div>
        <div className="pdp-information">
          <a className="pdp-brand" href="#/products">
            Visit the WearDay collection
          </a>
          <h1>{product.name}</h1>
          <p className="pdp-subtitle">
            {isCombo
              ? `${product.occasion} collection · Shirt + Pants + Watch`
              : `${product.gender}’s ${product.type} · Everyday collection`}
          </p>
          {product.rating && (
            <p className="pdp-rating">
              <span aria-label={`${product.rating} out of 5 stars`}>
                ★ {product.rating}
              </span>
              <span>{product.reviews} ratings</span>
            </p>
          )}
          <div className="pdp-price-block">
            <span>{isCombo ? "Complete 3-piece combo" : "Product price"}</span>
            <strong>{product.price}</strong>
            <small>
              {isCombo
                ? "Total of the three individual prices below."
                : "Final delivery charges are shown in your bag."}
            </small>
          </div>
          <p className="pdp-description">{description}</p>
          {isCombo && (
            <div className="pdp-combo-breakdown">
              <h2>What’s in your combo</h2>
              {product.items.map((item, index) => (
                <div key={item.name}>
                  <span>
                    <small>0{index + 1}</small>
                    {item.name}
                  </span>
                  <strong>{money(item.amount)}</strong>
                </div>
              ))}
              <div className="pdp-combo-total">
                <span>Combo total</span>
                <strong>{product.price}</strong>
              </div>
            </div>
          )}
          {isCombo ? (
            <div className="pdp-combo-sizes">
              <label>
                Shirt size
                <select
                  value={shirtSize}
                  onChange={(event) => setShirtSize(event.target.value)}
                >
                  {shirtSizes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                Pants waist (inches)
                <select
                  value={pantsSize}
                  onChange={(event) => setPantsSize(event.target.value)}
                >
                  {trouserSizes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <small>
                Watch included as shown. Check sizing before adding your set.
              </small>
            </div>
          ) : (
            <fieldset className="detail-sizes">
              <legend>
                Select size: <strong>{selectedSize}</strong>
              </legend>
              {product.sizes.map((item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="product-size"
                    checked={selectedSize === item}
                    onChange={() => setSize(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </fieldset>
          )}
          <section className="pdp-about">
            <h2>About this {isCombo ? "combo" : "item"}</h2>
            <ul>
              {isCombo ? (
                <>
                  <li>
                    One coordinated {product.occasion.toLowerCase()} look with
                    three pieces.
                  </li>
                  <li>
                    Includes {product.items.map((item) => item.name).join(", ")}
                    .
                  </li>
                  <li>Choose shirt size and pants waist separately.</li>
                  <li>
                    One combo added to your bag includes all three products.
                  </li>
                </>
              ) : (
                <>
                  <li>Style: {product.name}.</li>
                  <li>
                    Collection: {product.gender} · {product.type}.
                  </li>
                  <li>Available sizes: {product.sizes.join(", ")}.</li>
                  <li>Select your preferred size before adding to your bag.</li>
                </>
              )}
            </ul>
          </section>
        </div>
        <aside className="pdp-purchase" aria-label="Purchase options">
          <span className="pdp-purchase-label">
            {isCombo ? "Your complete look" : "Make it yours"}
          </span>
          <strong className="pdp-buy-price">{product.price}</strong>
          <p className="pdp-delivery">
            <Icon name="truck" size={18} /> Free delivery on orders over $50
          </p>
          <div className="pdp-selected">
            <span>Selected size</span>
            <strong>{selectedSize}</strong>
          </div>
          <label className="pdp-quantity">
            {isCombo ? "Number of combos" : "Quantity"}
            <select
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </label>
          <div className="pdp-order-total">
            <span>{isCombo ? "Set" : "Items"} total</span>
            <strong>{money(product.amount * quantity)}</strong>
          </div>
          <button
            className="pdp-add-button"
            onClick={() => onAddToCart(product, selectedSize, quantity)}
          >
            <Icon name="bag" size={18} />
            {isCombo ? "Add Combo to Cart" : "Add to Cart"}
          </button>
          <button
            className="pdp-save-button"
            aria-pressed={saved}
            onClick={() => onToggleSaved(product.name)}
          >
            <Icon
              name="heart"
              size={17}
              fill={saved ? "currentColor" : "none"}
            />
            {saved ? "Saved to Wishlist" : "Add to Wishlist"}
          </button>
          <a className="pdp-view-bag" href="#/cart">
            View your bag →
          </a>
          <div className="pdp-purchase-perks">
            <span>
              <Icon name="return" size={17} /> Easy 30-day returns
            </span>
            <span>
              <Icon name="lock" size={17} /> No payment taken when adding to bag
            </span>
          </div>
        </aside>
      </div>
      {isCombo && (
        <div className="pdp-combo-note">
          <strong>Every piece, every price.</strong>
          <span>
            Your combo includes all three products shown. The total is the sum
            of the individual prices, with no additional bundle charge.
          </span>
        </div>
      )}
    </div>
  );
}
export default ProductPage;
