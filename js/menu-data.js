export const menuItems = [
  {
    id: "hot-jebena",
    name: "Jebena Buna",
    nameAmharic: "ጀበና ቡና",
    category: "hot",
    price: 50,
    description:
      "Traditional Ethiopian coffee brewed in a jebena and served fresh.",
  },
  {
    id: "hot-espresso",
    name: "Espresso",
    nameAmharic: "ኤስፕሬሶ",
    category: "hot",
    price: 75,
    description: "Single or double shot of a signature espresso blend.",
  },
  {
    id: "hot-macchiato",
    name: "Macchiato",
    nameAmharic: "ማኪያቶ",
    category: "hot",
    price: 130,
    description: "Rich espresso with a small amount of silky milk foam.",
  },
  {
    id: "hot-tea",
    name: "Tea",
    nameAmharic: "ሻይ",
    category: "hot",
    price: 50,
    description: "Classic black tea served hot with sugar on the side.",
  },
  {
    id: "hot-green-tea",
    name: "Green Tea",
    nameAmharic: "አረንጓዴ ሻይ",
    category: "hot",
    price: 65,
    description: "Light, soothing green tea with a gentle aroma.",
  },
  {
    id: "hot-matcha",
    name: "Matcha",
    nameAmharic: "ማትቻ",
    category: "hot",
    price: 150,
    description: "Creamy Japanese green tea drink with a smooth finish.",
  },
  {
    id: "hot-ginger-tea",
    name: "Ginger Tea",
    nameAmharic: "ቀሽር",
    category: "hot",
    price: 77,
    description: "Warm tea infused with fresh ginger for a spicy flavor.",
  },
  {
    id: "hot-milk-tea",
    name: "Milk Tea",
    nameAmharic: "ወተት ሻይ",
    category: "hot",
    price: 150,
    description: "Black tea with milk and sugar.",
  },
  {
    id: "hot-vegan-soy-macchiato",
    name: "Vegan Soy Macchiato",
    nameAmharic: "አኩሪ አተር ማኪያቶ",
    category: "hot",
    price: 200,
    description: "Espresso with steamed soy milk for dairy-free macchiato.",
  },
  {
    id: "hot-vegan-oat-macchiato",
    name: "Vegan Oat Macchiato",
    nameAmharic: "አጃ ማኪያቶ",
    category: "hot",
    price: 190,
    description: "Espresso with creamy oat milk, sweet and vegan-friendly.",
  },

  {
    id: "cold-iced-latte",
    name: "Iced Latte",
    nameAmharic: "አይስድ ላቴ",
    category: "cold",
    price: 150,
    description: "Espresso with cold milk and ice.",
  },
  {
    id: "cold-iced-caramel-latte",
    name: "Iced Caramel Latte",
    nameAmharic: "አይስድ ካራሚል ላቴ",
    category: "cold",
    price: 150,
    description: "Espresso with cold milk, ice, and sweet caramel syrup.",
  },
  {
    id: "cold-iced-matcha",
    name: "Iced Matcha",
    nameAmharic: "አይስድ ማትቻ",
    category: "cold",
    price: 150,
    description: "Japanese green tea drink with ice.",
  },
  {
    id: "cold-iced-americano",
    name: "Iced Americano",
    nameAmharic: "አይስድ አሜሪካኖ",
    category: "cold",
    price: 110,
    description: "Espresso shots over ice topped with cold water.",
  },
  {
    id: "cold-peach-tea",
    name: "Peach Tea",
    nameAmharic: "ፒች ሻይ",
    category: "cold",
    price: 90,
    description: "Refreshing peach tea served cold.",
  },

  {
    id: "baked-croissant",
    name: "Croissant",
    nameAmharic: "ክሮሳን",
    category: "baked",
    price: 95,
    description: "Flaky, golden croissant with butter.",
  },
  {
    id: "baked-chocolate-croissant",
    name: "Chocolate Croissant",
    nameAmharic: "ቸኮሌት ክሮሳን",
    category: "baked",
    price: 105,
    description: "Crispy croissant with chocolate inside.",
  },
  {
    id: "baked-cinnamon-roll",
    name: "Cinnamon Roll",
    nameAmharic: "የቀረፋ ዳቦ",
    category: "baked",
    price: 100,
    description: "Warm, fluffy roll with cinnamon sugar filling and cream.",
  },
  {
    id: "baked-strawberry-muffin",
    name: "Strawberry Muffin",
    nameAmharic: "እንጆሪ ኬክ",
    category: "baked",
    price: 200,
    description: "Moist muffin with fresh strawberries topping.",
  },
  {
    id: "baked-chocolate-chip-cookie",
    name: "Chocolate Chip Cookie",
    nameAmharic: "ቸኮሌት ቺፕ ኩኪስ",
    category: "baked",
    price: 80,
    description: "Soft cookie with chocolate chips.",
  },
  {
    id: "baked-banana-bread",
    name: "Banana Bread",
    nameAmharic: "የሙዝ ዳቦ",
    category: "baked",
    price: 50,
    description: "Sweet bread made from banana.",
  },
  {
    id: "baked-cheesecake",
    name: "Cheesecake",
    nameAmharic: "ቺዝ ኬክ",
    category: "baked",
    price: 150,
    description: "Delicate pastry with fruit filling and light glaze.",
  },
];

export function getItemsByCategory(category) {
  if (category === "all") return menuItems;
  return menuItems.filter((item) => item.category === category);
}

export function searchItems(query) {
  const lowerQuery = query.trim().toLowerCase();
  if (!lowerQuery) return menuItems;

  return menuItems.filter((item) => {
    const name = item.name.toLowerCase();
    const description = item.description.toLowerCase();
    const nameAmharic = item.nameAmharic.toLowerCase();

    return (
      name.includes(lowerQuery) ||
      description.includes(lowerQuery) ||
      nameAmharic.includes(lowerQuery)
    );
  });
}

export function getItemById(id) {
  return menuItems.find((item) => item.id === id);
}
