export function filterProducts(
  products,
  {
    gender = "All",
    query = "",
    types = [],
    sizes = [],
    maxPrice = Infinity,
    sort = "recommended",
  } = {},
) {
  const search = query
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "");
  const results = products.filter(
    (product) =>
      (gender === "All" ||
        product.gender === gender ||
        product.gender === "Unisex") &&
      (!search ||
        `${product.name} ${product.type} ${product.brand}`
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .includes(search)) &&
      (!types.length || types.includes(product.type)) &&
      (!sizes.length || sizes.some((size) => product.sizes.includes(size))) &&
      product.amount <= maxPrice,
  );
  if (sort === "price-low") results.sort((a, b) => a.amount - b.amount);
  if (sort === "price-high") results.sort((a, b) => b.amount - a.amount);
  if (sort === "rating")
    results.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  if (sort === "name") results.sort((a, b) => a.name.localeCompare(b.name));
  return results;
}
