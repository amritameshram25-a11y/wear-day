import { useCallback, useEffect, useState } from "react";
import Announcement from "./components/layout/Announcement.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Hero from "./components/home/Hero.jsx";
import Combos from "./components/home/Combos.jsx";
import Categories from "./components/home/Categories.jsx";
import OutfitBuilder from "./components/home/OutfitBuilder.jsx";
import NewArrivals from "./components/home/NewArrivals.jsx";
import StylingGuides from "./components/home/StylingGuides.jsx";
import Benefits from "./components/home/Benefits.jsx";
import Recommended from "./components/home/Recommended.jsx";
import Footer from "./components/layout/Footer.jsx";
import MobileNav from "./components/layout/MobileNav.jsx";
import CartConfirmation from "./components/shop/CartConfirmation.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import useShop from "./hooks/useShop.js";
import useRoute from "./hooks/useRoute.js";
import { catalog, getProduct } from "./data/catalog.js";
import "./styles/App.css";
import "./styles/Shop.css";

function App() {
  const { cart, wishlist, dispatch, storageError } = useShop();
  const route = useRoute();
  const [notice, setNotice] = useState(null);
  const closeNotice = useCallback(() => setNotice(null), []);
  const savedItems = catalog
    .filter((product) => wishlist.includes(product.id))
    .map((product) => product.name);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  const addToCart = (input, size, quantity = 1) => {
    const product = getProduct(input);
    if (
      !product ||
      !product.sizes.includes(size) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 99
    )
      return;
    const line = cart.find(
      (item) => item.productId === product.id && item.size === size,
    );
    if ((line?.quantity || 0) + quantity > 99) {
      setNotice({
        title: "Maximum quantity reached",
        product,
        size,
        href: "#/cart",
        linkText: "View Bag",
      });
      return;
    }
    dispatch({ type: "add", productId: product.id, size, quantity });
    setNotice({
      title: "Added to Cart",
      quantity,
      product,
      size,
      href: "#/cart",
      linkText: "View Bag",
    });
  };
  const toggleSaved = (name) => {
    const product = catalog.find((item) => item.name === name);
    if (!product) return;
    const removing = wishlist.includes(product.id);
    dispatch({ type: "wishlist", productId: product.id });
    setNotice({
      title: removing ? "Removed from Wishlist" : "Added to Wishlist",
      product,
      href: "#/wishlist",
      linkText: "View Wishlist",
    });
  };
  const productProps = {
    onAddToCart: addToCart,
    savedItems,
    onToggleSaved: toggleSaved,
  };
  const isHome = route.path === "/";
  useEffect(() => {
    const title =
      route.path === "/men"
        ? "Men’s Clothing"
        : route.path === "/women"
          ? "Women’s Clothing"
          : route.path === "/cart"
            ? "Your Bag"
            : route.path === "/wishlist"
              ? "Your Wishlist"
              : route.path.startsWith("/product/")
                ? getProduct(route.path.split("/")[2])?.name || "Product"
                : route.path === "/products"
                  ? "All Products"
                  : "Everyday Looks, Made Effortless";
    document.title = `${title} | WearDay`;
  }, [route.path]);

  let page;
  if (isHome)
    page = (
      <>
        <Hero />
        <section className="shop-departments">
          <a href="#/men">
            <span>THE MEN’S EDIT</span>
            <h2>Everyday, your way.</h2>
            <strong>Shop Men →</strong>
          </a>
          <a href="#/women">
            <span>THE WOMEN’S EDIT</span>
            <h2>Make it your own.</h2>
            <strong>Shop Women →</strong>
          </a>
        </section>
        <Categories />
        <Combos />
        <OutfitBuilder />
        <NewArrivals {...productProps} />
        <StylingGuides />
        <Benefits />
        <Recommended {...productProps} />
      </>
    );
  else if (["/men", "/women", "/products"].includes(route.path))
    page = (
      <ProductsPage
        key={`${route.path}?${route.query}`}
        gender={
          route.path === "/men"
            ? "Men"
            : route.path === "/women"
              ? "Women"
              : "All"
        }
        initialSearch={new URLSearchParams(route.query).get("q") || ""}
        {...productProps}
      />
    );
  else if (route.path === "/wishlist")
    page = <WishlistPage {...productProps} />;
  else if (route.path === "/cart")
    page = (
      <CartPage
        cart={cart}
        dispatch={dispatch}
        savedItems={savedItems}
        onToggleSaved={toggleSaved}
      />
    );
  else if (route.path.startsWith("/product/"))
    page = (
      <ProductPage
        key={route.path}
        id={route.path.split("/")[2]}
        {...productProps}
      />
    );
  else
    page = (
      <div className="shop-empty">
        <h1>Page not found</h1>
        <a className="button button-dark" href="#/">
          Go Home
        </a>
      </div>
    );
  return (
    <div>
      <a
        className="skip-to-main"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>
      <Announcement />
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        currentPath={route.path}
      />
      <main id="main-content" tabIndex={-1}>
        {storageError && (
          <p className="storage-notice" role="status">
            Browser storage is unavailable. Your bag and wishlist will last for
            this visit only.
          </p>
        )}
        {page}
      </main>
      <Footer />
      <MobileNav cartCount={cartCount} currentPath={route.path} />
      {notice && (
        <CartConfirmation
          key={`${notice.product.id}-${notice.title}-${notice.size}`}
          notice={notice}
          onClose={closeNotice}
        />
      )}
    </div>
  );
}
export default App;
