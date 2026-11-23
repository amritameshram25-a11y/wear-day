import { catalog, getProduct } from "../data/catalog.js";

export const STORAGE_KEY = "wearday-shop-v1";
export const emptyShop = { cart: [], wishlist: [] };
export function sanitizeShop(value) {
  if (!value || typeof value !== "object") return emptyShop;
  const cart = [];
  if (Array.isArray(value.cart)) {
    value.cart.forEach((line) => {
      const product = getProduct(line?.productId);
      if (
        !product ||
        !product.sizes.includes(line.size) ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1
      )
        return;
      const quantity = Math.min(99, line.quantity);
      const existing = cart.find(
        (item) => item.productId === product.id && item.size === line.size,
      );
      if (existing)
        existing.quantity = Math.min(99, existing.quantity + quantity);
      else cart.push({ productId: product.id, size: line.size, quantity });
    });
  }
  const validIds = new Set(catalog.map((product) => product.id));
  const wishlist = Array.isArray(value.wishlist)
    ? [...new Set(value.wishlist.filter((id) => validIds.has(id)))]
    : [];
  return { cart, wishlist };
}
export function readShop(storage) {
  try {
    return sanitizeShop(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch {
    return emptyShop;
  }
}
export function shopReducer(state, action) {
  switch (action.type) {
    case "add": {
      const quantity = action.quantity ?? 1;
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99)
        return state;
      const product = getProduct(action.productId);
      if (!product || !product.sizes.includes(action.size)) return state;
      const exists = state.cart.some(
        (line) => line.productId === product.id && line.size === action.size,
      );
      return {
        ...state,
        cart: exists
          ? state.cart.map((line) =>
              line.productId === product.id && line.size === action.size
                ? { ...line, quantity: Math.min(99, line.quantity + quantity) }
                : line,
            )
          : [
              ...state.cart,
              { productId: product.id, size: action.size, quantity },
            ],
      };
    }
    case "quantity":
      if (
        !Number.isInteger(action.quantity) ||
        action.quantity < 1 ||
        action.quantity > 99
      )
        return state;
      return {
        ...state,
        cart: state.cart.map((line) =>
          line.productId === action.productId && line.size === action.size
            ? { ...line, quantity: action.quantity }
            : line,
        ),
      };
    case "remove":
      return {
        ...state,
        cart: state.cart.filter(
          (line) =>
            !(line.productId === action.productId && line.size === action.size),
        ),
      };
    case "wishlist":
      if (!getProduct(action.productId)) return state;
      return {
        ...state,
        wishlist: state.wishlist.includes(action.productId)
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    default:
      return state;
  }
}
