import { useSyncExternalStore } from "react";
import {
  emptyShop,
  readShop,
  sanitizeShop,
  shopReducer,
  STORAGE_KEY,
} from "../utils/shopState.js";

// A shared snapshot keeps all shopping controls in sync without writing inside render.
let snapshot;
try {
  snapshot = { ...readShop(window.localStorage), storageError: false };
} catch {
  snapshot = { ...emptyShop, storageError: true };
}
const listeners = new Set();
const notify = () => listeners.forEach((listener) => listener());
const getSnapshot = () => snapshot;
function receiveStorage(event) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  try {
    snapshot = {
      ...sanitizeShop(JSON.parse(event.newValue)),
      storageError: false,
    };
  } catch {
    snapshot = { ...emptyShop, storageError: false };
  }
  notify();
}
function subscribe(listener) {
  if (!listeners.size) window.addEventListener("storage", receiveStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", receiveStorage);
  };
}
function dispatch(action) {
  const next = shopReducer(snapshot, action);
  if (next === snapshot) return;
  const state = { cart: next.cart, wishlist: next.wishlist };
  let storageError = false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    storageError = true;
  }
  snapshot = { ...state, storageError };
  notify();
}
export default function useShop() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  return { ...state, dispatch };
}
