import Icon from "../shared/Icon.jsx";
import { items } from "../../data/mobileNav.js";
import "../../styles/components/MobileNav.css";
function MobileNav({ cartCount, currentPath }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Quick navigation">
      {items.map((item) => (
        <a
          href={item.href}
          key={item.label}
          aria-current={currentPath === item.path ? "page" : undefined}
        >
          <Icon name={item.icon} size={22} />
          <span>
            {item.label}
            {item.label === "Bag" && cartCount ? ` (${cartCount})` : ""}
          </span>
        </a>
      ))}
    </nav>
  );
}
export default MobileNav;
