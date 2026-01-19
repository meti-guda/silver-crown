import React from "react";
import { useMenu } from "./MenuContext";
import { FaShoppingBag } from "react-icons/fa";

const SPECIAL_ITEMS = [
  {
    id: "hot-matcha",
    image: "/images/matcha.png",
    price: 150,
    name: "Matcha",
    description: "Creamy Japanese green tea drink with a smooth finish.",
  },
  {
    id: "hot-milk-tea",
    image: "/images/milk tea.png",
    price: 150,
    name: "Milk Tea",
    description: "Black tea with milk and sugar.",
  },
  {
    id: "cold-peach-tea",
    image: "/images/peach tea.png",
    price: 90,
    name: "Peach Tea",
    description: "Refreshing peach tea.",
  },
  {
    id: "baked-strawberry-muffin",
    image: "/images/Strawberry.png",
    price: 200,
    name: "Strawberry Muffin",
    description: "Moist muffin with fresh strawberries topping.",
  },
];

const SpecialMenu = () => {
  const { addToCart } = useMenu();

  return (
    <section className="special-menu">
      <div className="container">
        <h2 className="section-title special-title">Our Special Menu</h2>
        <div className="special-list">
          {SPECIAL_ITEMS.map((item) => (
            <article className="special-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="special-image"
              />
              <div className="special-text">
                <div className="special-price">
                  {item.price} <span className="item-amharic">ብር</span>
                </div>
                <h3 className="special-name">{item.name}</h3>
                <p className="special-desc">{item.description}</p>
                <button
                  className="btn primary-btn special-add-btn"
                  onClick={() => addToCart(item.id, 1)}
                > <FaShoppingBag/>
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialMenu;
