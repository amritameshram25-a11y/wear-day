import { comboProducts } from "./combos.js";
import { products as arrivals } from "./newArrivals.js";
import { products as recommendations } from "./recommended.js";

const extras = [
  [
    "Oxford Everyday Shirt",
    44.99,
    "Men",
    "Shirts",
    "photo-1598033129183-c4f50c736f10",
  ],
  [
    "Classic Cotton Polo",
    32.99,
    "Men",
    "T-Shirts",
    "photo-1521572163474-6864f9cf17ab",
  ],
  [
    "Relaxed Denim Shirt",
    54.99,
    "Men",
    "Shirts",
    "photo-1591047139829-d91aecb6caea",
  ],
  [
    "Weekend Overshirt",
    59.99,
    "Men",
    "Jackets",
    "photo-1591047139829-d91aecb6caea",
  ],
  [
    "Straight Leg Chinos",
    45.99,
    "Men",
    "Pants",
    "photo-1473966968600-fa801b869a1a",
  ],
  [
    "Everyday Zip Hoodie",
    54.99,
    "Men",
    "Hoodies",
    "photo-1556821840-3a63f95609a7",
  ],
  [
    "Relaxed Linen Top",
    34.99,
    "Women",
    "Shirts",
    "photo-1598033129183-c4f50c736f10",
  ],
  [
    "Essential Cotton Tee",
    24.99,
    "Women",
    "T-Shirts",
    "photo-1521572163474-6864f9cf17ab",
  ],
  [
    "High Rise Straight Jeans",
    54.99,
    "Women",
    "Denim",
    "photo-1541099649105-f69ad21f3246",
  ],
  [
    "Soft Weekend Hoodie",
    49.99,
    "Women",
    "Hoodies",
    "photo-1556821840-3a63f95609a7",
  ],
  [
    "Relaxed Tailored Pants",
    44.99,
    "Women",
    "Pants",
    "photo-1473966968600-fa801b869a1a",
  ],
  [
    "Everyday Layering Jacket",
    64.99,
    "Women",
    "Jackets",
    "photo-1591047139829-d91aecb6caea",
  ],
  [
    "Boxy Fit Cotton Tee",
    27.99,
    "Women",
    "T-Shirts",
    "photo-1521572163474-6864f9cf17ab",
  ],
  [
    "Oversized Linen Shirt",
    42.99,
    "Women",
    "Shirts",
    "photo-1598033129183-c4f50c736f10",
  ],
];
const types = [
  "T-Shirts",
  "Shirts",
  "Pants",
  "Hoodies",
  "Jackets",
  "T-Shirts",
  "Denim",
  "Accessories",
  "Accessories",
  "Shoes",
];
const genders = [
  "Men",
  "Women",
  "Unisex",
  "Men",
  "Women",
  "Men",
  "Men",
  "Unisex",
  "Unisex",
  "Unisex",
];
export const productId = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const money = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );
export const catalog = [
  ...[...arrivals, ...recommendations].map((product, index) => ({
    ...product,
    amount: Number(product.price.replace("$", "")),
    gender: genders[index],
    type: types[index],
  })),
  ...extras.map(([name, amount, gender, type, photo]) => ({
    name,
    amount,
    price: money(amount),
    gender,
    type,
    photo,
    rating: "4.8",
    reviews: 18,
    colors: ["#6d785f", "#e3dccd", "#30352f"],
  })),
  ...comboProducts,
].map((product) => ({
  ...product,
  id: productId(product.name),
  brand: "WearDay",
  sizes:
    product.sizes ||
    (product.type === "Accessories"
      ? ["One Size"]
      : product.type === "Shoes"
        ? ["6", "7", "8", "9", "10"]
        : ["XS", "S", "M", "L", "XL"]),
}));
export const getProduct = (product) =>
  catalog.find(
    (item) =>
      item.id === product ||
      item.id === product?.id ||
      item.name === product?.name,
  );
export const productImage = (product) =>
  product.image ||
  `https://images.unsplash.com/${product.photo}?auto=format&fit=crop&w=700&q=85`;
