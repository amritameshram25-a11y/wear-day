export const shirtSizes = ["XS", "S", "M", "L", "XL"];
export const trouserSizes = ["28", "30", "32", "34", "36"];
export const comboSize = (shirt, pants) => `Shirt ${shirt} / Pants ${pants}`;

const outfits = [
  {
    occasion: "Wedding",
    name: "Wedding Occasion Combo",
    heading: "Dress for the big moment.",
    description:
      "An ivory celebration shirt, tailored sand trousers and a gold-tone watch. Three considered pieces for one memorable look.",
    items: [
      { name: "Ivory Celebration Shirt", amount: 89.99 },
      { name: "Sand Tailored Trousers", amount: 69.99 },
      { name: "Champagne Dial Watch", amount: 99.99 },
    ],
  },
  {
    occasion: "Festival",
    name: "Festival Occasion Combo",
    heading: "A little more celebration.",
    description:
      "Rich festive color, easy cream trousers and a finishing touch of gold. Your ready-to-style celebration set.",
    items: [
      { name: "Wine Festive Shirt", amount: 59.99 },
      { name: "Cream Straight Trousers", amount: 49.99 },
      { name: "Classic Gold-Tone Watch", amount: 79.99 },
    ],
  },
  {
    occasion: "Casual",
    name: "Casual Everyday Combo",
    heading: "Easy days. Complete look.",
    description:
      "A sage casual shirt, beige chinos and a leather-strap watch. An effortless combination for coffee runs and weekend plans.",
    items: [
      { name: "Sage Casual Shirt", amount: 39.99 },
      { name: "Beige Chino Pants", amount: 44.99 },
      { name: "Everyday Leather-Strap Watch", amount: 59.99 },
    ],
  },
  {
    occasion: "Formal",
    name: "Formal Workday Combo",
    heading: "Look sharp. Feel ready.",
    description:
      "A crisp blue shirt, charcoal trousers and a polished silver watch. A complete look for workdays and important meetings.",
    items: [
      { name: "Blue Formal Shirt", amount: 49.99 },
      { name: "Charcoal Tailored Trousers", amount: 59.99 },
      { name: "Navy Dial Silver Watch", amount: 89.99 },
    ],
  },
];
export const comboProducts = outfits.map((outfit) => {
  const amount =
    Math.round(outfit.items.reduce((sum, item) => sum + item.amount, 0) * 100) /
    100;
  return {
    ...outfit,
    amount,
    price: `$${amount.toFixed(2)}`,
    image: `/images/combos/${outfit.occasion.toLowerCase()}.webp`,
    imageAlt: `${outfit.occasion} outfit flat lay with ${outfit.items.map((item) => item.name).join(", ")}`,
    gender: "Men",
    type: "Combos",
    label: "3-piece combo",
    colors: ["#ede3cc", "#69765c", "#424c50"],
    sizes: shirtSizes.flatMap((shirt) =>
      trouserSizes.map((pants) => comboSize(shirt, pants)),
    ),
    defaultSize: comboSize("M", "32"),
  };
});
