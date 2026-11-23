import { catalog, money, productImage } from "../../data/catalog.js";
import "../../styles/components/Combos.css";

function Combos() {
  const combos = catalog.filter((product) => product.type === "Combos");
  return (
    <section
      className="combos-section section-wrap"
      id="combos"
      aria-labelledby="combos-heading"
    >
      <div className="combos-heading">
        <div>
          <span className="shop-kicker">THREE PIECES. ONE COMPLETE LOOK.</span>
          <h2 id="combos-heading">A combo for every occasion.</h2>
          <p>
            Wedding, festival, casual or formal—your next outfit starts here.
          </p>
        </div>
        <a className="text-link" href="#/products?q=combos">
          Explore all combos →
        </a>
      </div>
      <div className="combo-grid">
        {combos.map((combo) => (
          <article className="combo-card" key={combo.id}>
            <a className="combo-photo" href={`#/product/${combo.id}`}>
              <img
                src={productImage(combo)}
                alt={combo.imageAlt}
                loading="lazy"
              />
              <span>{combo.occasion}</span>
            </a>
            <div className="combo-copy">
              <h3>
                <a href={`#/product/${combo.id}`}>{combo.heading}</a>
              </h3>
              <ul>
                {combo.items.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <strong>{money(item.amount)}</strong>
                  </li>
                ))}
              </ul>
              <div className="combo-total">
                <span>
                  Complete combo <small>All 3 products included</small>
                </span>
                <strong>{combo.price}</strong>
              </div>
              <a className="button button-dark" href={`#/product/${combo.id}`}>
                Choose Sizes & Shop →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Combos;
