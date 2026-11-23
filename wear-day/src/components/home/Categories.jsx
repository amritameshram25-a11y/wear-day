import Icon from "../shared/Icon.jsx";
import "../../styles/components/Categories.css";

import { categories } from "../../data/categories.js";

function Categories() {
  return (
    <section className="categories section-wrap" id="categories">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Find your new favorite</span>
          <h2>Shop by category</h2>
        </div>
        <a className="text-link" href="#/products">
          View everything <Icon name="arrow" size={16} />
        </a>
      </div>
      <div className="category-grid">
        {categories.map(([name, photo], index) => (
          <a
            className="category-card"
            href={`#/products?q=${encodeURIComponent(name)}`}
            key={name}
          >
            <div className="category-image">
              <img
                src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=550&q=80`}
                alt=""
              />
            </div>
            <div className="category-label">
              <span>{name}</span>
              <Icon name="arrow" size={15} />
            </div>
            {index === 0 && <span className="category-sr-label">Shop</span>}
          </a>
        ))}
      </div>
    </section>
  );
}

export default Categories;
