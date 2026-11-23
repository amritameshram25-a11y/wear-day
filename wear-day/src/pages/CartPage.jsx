import { getProduct, money, productImage } from "../data/catalog.js";

function CartPage({ cart, dispatch, onToggleSaved, savedItems }) {
  const subtotal = cart.reduce(
    (sum, line) => sum + getProduct(line.productId).amount * line.quantity,
    0,
  );
  return (
    <div className="shopping-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span>/</span>
        <span>Shopping Bag</span>
      </nav>
      <h1>
        Your Shopping Bag{" "}
        <small>
          {cart.reduce((sum, line) => sum + line.quantity, 0)} items
        </small>
      </h1>
      {cart.length ? (
        <div className="bag-layout">
          <div className="bag-lines">
            {cart.map((line) => {
              const product = getProduct(line.productId);
              return (
                <article
                  className="bag-line"
                  key={`${product.id}-${line.size}`}
                >
                  <a href={`#/product/${product.id}`}>
                    <img src={productImage(product)} alt={product.name} />
                  </a>
                  <div className="bag-line-info">
                    <span className="shop-kicker">WEARDAY</span>
                    <h2>
                      <a href={`#/product/${product.id}`}>{product.name}</a>
                    </h2>
                    <p>
                      Size: {line.size} · {product.gender}
                    </p>
                    <strong>{money(product.amount * line.quantity)}</strong>
                    <span className="unit-price">{product.price} each</span>
                    {product.items && (
                      <ul className="cart-combo-contents">
                        {product.items.map((item) => (
                          <li key={item.name}>
                            {item.name} — {money(item.amount)}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="quantity-control">
                      <button
                        aria-label={`Decrease ${product.name} quantity, size ${line.size}`}
                        disabled={line.quantity <= 1}
                        onClick={() =>
                          dispatch({
                            type: "quantity",
                            ...line,
                            quantity: line.quantity - 1,
                          })
                        }
                      >
                        −
                      </button>
                      <span aria-label="Quantity">{line.quantity}</span>
                      <button
                        aria-label={`Increase ${product.name} quantity, size ${line.size}`}
                        disabled={line.quantity >= 99}
                        onClick={() =>
                          dispatch({
                            type: "quantity",
                            ...line,
                            quantity: line.quantity + 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="bag-line-actions">
                      <button
                        onClick={() => dispatch({ type: "remove", ...line })}
                      >
                        Remove
                      </button>
                      <button onClick={() => onToggleSaved(product.name)}>
                        {savedItems.includes(product.name)
                          ? "Remove from wishlist"
                          : "Save to wishlist"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <aside className="bag-summary">
            <h2>Bag Summary</h2>
            <div>
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div>
              <span>Delivery</span>
              <span>{subtotal >= 50 ? "Free" : "Calculated at checkout"}</span>
            </div>
            <div className="summary-total">
              <span>Items total</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <p className="checkout-note">
              Online checkout is not available yet. Your items are saved in this
              browser.
            </p>
            <a className="button button-dark" href="#/products">
              Continue Shopping
            </a>
          </aside>
        </div>
      ) : (
        <div className="shop-empty">
          <h2>Your bag is waiting</h2>
          <p>Find something you’ll love wearing every day.</p>
          <a className="button button-dark" href="#/products">
            Explore Products
          </a>
        </div>
      )}
    </div>
  );
}
export default CartPage;
