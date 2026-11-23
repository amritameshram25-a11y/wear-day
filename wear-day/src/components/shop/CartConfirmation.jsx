import { useEffect } from "react";
import Icon from "../shared/Icon.jsx";
import { productImage } from "../../data/catalog.js";
function CartConfirmation({ notice, onClose }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 6000);
    const escape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", escape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", escape);
    };
  }, [notice, onClose]);
  return (
    <aside className="cart-confirmation" aria-label="Shopping confirmation">
      <div className="confirmation-top">
        <strong role="status">
          <Icon name="check" size={19} />
          {notice.title}
        </strong>
        <button aria-label="Close confirmation" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <div className="confirmation-product">
        <img src={productImage(notice.product)} alt="" />
        <div>
          <strong>{notice.product.name}</strong>
          {notice.size && <p>Size: {notice.size}</p>}
          <span>
            {notice.product.price}
            {notice.quantity > 1 ? ` × ${notice.quantity}` : ""}
          </span>
        </div>
      </div>
      <a className="button button-dark" href={notice.href} onClick={onClose}>
        {notice.linkText} →
      </a>
    </aside>
  );
}
export default CartConfirmation;
