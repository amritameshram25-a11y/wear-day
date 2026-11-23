import { useState } from "react";
import ProductCard from "../components/shared/ProductCard.jsx";
import { catalog, money } from "../data/catalog.js";
import { filterProducts } from "../utils/filterProducts.js";

const priceCeiling =
  Math.ceil(Math.max(...catalog.map((product) => product.amount)) / 10) * 10;

function ProductsPage({
  gender = "All",
  initialSearch = "",
  onAddToCart,
  savedItems,
  onToggleSaved,
}) {
  const [query, setQuery] = useState(initialSearch);
  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [sort, setSort] = useState("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const title = gender === "All" ? "All Products" : `${gender}’s Clothing`;
  const candidates = catalog.filter(
    (product) =>
      gender === "All" ||
      product.gender === gender ||
      product.gender === "Unisex",
  );
  const typeOptions = [...new Set(candidates.map((product) => product.type))];
  const sizeOptions = [
    ...new Set(candidates.flatMap((product) => product.sizes)),
  ];
  const products = filterProducts(catalog, {
    gender,
    query,
    types,
    sizes,
    maxPrice,
    sort,
  });
  const toggle = (setter, value) =>
    setter((items) =>
      items.includes(value)
        ? items.filter((item) => item !== value)
        : [...items, value],
    );
  const clear = () => {
    setQuery("");
    setTypes([]);
    setSizes([]);
    setMaxPrice(priceCeiling);
  };
  const filterCount =
    types.length + sizes.length + (maxPrice < priceCeiling ? 1 : 0);
  return (
    <div className="collection-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span>/</span>
        <a href="#/products">Clothing</a>
        <span>/</span>
        <span>{title}</span>
      </nav>
      <div className="collection-heading">
        <div>
          <span className="shop-kicker">FIND YOUR EVERYDAY</span>
          <h1>
            {title} <small>{products.length} items</small>
          </h1>
          <p>Good fits. Easy choices. Made for your kind of day.</p>
        </div>
        <div className="gender-switch">
          <a href="#/men" aria-current={gender === "Men" ? "page" : undefined}>
            Men
          </a>
          <a
            href="#/women"
            aria-current={gender === "Women" ? "page" : undefined}
          >
            Women
          </a>
          <a
            href="#/products"
            aria-current={gender === "All" ? "page" : undefined}
          >
            All
          </a>
        </div>
      </div>
      <div className="collection-toolbar">
        <button
          className="filter-toggle"
          aria-expanded={filtersOpen}
          aria-controls="collection-filters"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          Filters {filterCount ? `(${filterCount})` : ""}
        </button>
        <label className="collection-search">
          <span className="sr-only">Search this collection</span>
          <input
            type="search"
            placeholder="Search styles, tees, denim…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="sort-control">
          Sort by{" "}
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>
      <div className="collection-layout">
        <aside
          id="collection-filters"
          className={`collection-filters ${filtersOpen ? "is-open" : ""}`}
          aria-label="Product filters"
        >
          <div className="filters-heading">
            <strong>FILTERS</strong>
            <button onClick={clear}>Clear all</button>
          </div>
          <fieldset>
            <legend>Categories</legend>
            {typeOptions.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={types.includes(type)}
                  onChange={() => toggle(setTypes, type)}
                />
                {type}
                <small>
                  (
                  {candidates.filter((product) => product.type === type).length}
                  )
                </small>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Size</legend>
            <div className="filter-sizes">
              {sizeOptions.map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    checked={sizes.includes(size)}
                    onChange={() => toggle(setSizes, size)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <label className="price-filter">
              Up to {money(maxPrice)}
              <input
                aria-label="Maximum price"
                type="range"
                min="10"
                max={priceCeiling}
                step="1"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
            </label>
          </fieldset>
          <p className="filter-note">
            Unisex essentials are available in both collections.
          </p>
        </aside>
        <div className="collection-results">
          <div className="active-filters" aria-live="polite">
            <span>{products.length} styles found</span>
            {query && <button onClick={() => setQuery("")}>“{query}” ×</button>}
            {types.map((type) => (
              <button key={type} onClick={() => toggle(setTypes, type)}>
                {type} ×
              </button>
            ))}
            {sizes.map((size) => (
              <button key={size} onClick={() => toggle(setSizes, size)}>
                Size {size} ×
              </button>
            ))}
          </div>
          {products.length ? (
            <div className="listing-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  saved={savedItems.includes(product.name)}
                  onToggleSaved={onToggleSaved}
                />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <h2>No matching styles</h2>
              <p>Try another search or clear your filters.</p>
              <button className="button button-dark" onClick={clear}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductsPage;
