import { useState } from "react";
import Icon from "../shared/Icon.jsx";
import { links } from "../../data/navbar.js";
import "../../styles/components/Navbar.css";

function Navbar({ cartCount, wishlistCount, currentPath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const submitSearch = (event) => {
    event.preventDefault();
    window.location.hash = `/products?q=${encodeURIComponent(query.trim())}`;
    setSearchOpen(false);
    setMenuOpen(false);
  };
  return (
    <header className="site-header">
      <div className="navbar section-wrap">
        <button
          className="mobile-menu-button icon-button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <a className="wordmark" href="#/" aria-label="WearDay home">
          <span className="brand-icon">
            <Icon name="bag" size={28} />
          </span>
          <span>
            WearDay<small>Everyday essentials</small>
          </span>
        </a>
        <nav
          id="main-navigation"
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <div className="nav-item" key={link.label}>
              <a
                href={link.href}
                aria-current={link.path === currentPath ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            aria-label="Search products"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Icon name="search" />
          </button>
          <a
            className="icon-button"
            href="#/wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Icon name="heart" />
            {!!wishlistCount && (
              <span className="cart-count">{wishlistCount}</span>
            )}
          </a>
          <a
            className="icon-button cart-action"
            href="#/cart"
            aria-label={`Shopping bag, ${cartCount} items`}
          >
            <Icon name="bag" />
            <span className="cart-count">{cartCount}</span>
          </a>
        </div>
        {searchOpen && (
          <form
            id="site-search"
            className="site-search-panel"
            role="search"
            onSubmit={submitSearch}
          >
            <label htmlFor="site-query">Find your next favorite</label>
            <div>
              <input
                id="site-query"
                type="search"
                placeholder="Search T-shirts, denim, jackets…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button className="button button-dark">Search</button>
              <button
                type="button"
                className="icon-button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <Icon name="close" />
              </button>
            </div>
          </form>
        )}
      </div>
    </header>
  );
}
export default Navbar;
