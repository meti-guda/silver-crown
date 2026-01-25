import { FaHeart, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { getItemsByCategory } from "../../data/menuItems";
import { useMenu } from "./MenuContext";

const CATEGORIES = [
  { id: "hot", title: "Hot Drinks", icon: "/images/jebena.png" },
  { id: "cold", title: "Cold Drinks", icon: "/images/iced_coffee.png" },
  { id: "baked", title: "Baked Goods", icon: "/images/pastries.png" },
];

const MenuGrid = ({ activeFilter, searchQuery }) => {
  const { isFavorite, toggleFavorite, addToCart } = useMenu();

  const matchesSearch = (item, q) => {
    const lower = q.trim().toLowerCase();
    if (!lower) return true;
    return (
      item.name.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower) ||
      item.nameAmharic.toLowerCase().includes(lower)
    );
  };

  return (
    <section id="menu-sections-container">
      {CATEGORIES.map((cat) => {
        const items = getItemsByCategory(cat.id).filter((item) => {
          const byFilter = activeFilter === "all" || activeFilter === cat.id;
          const bySearch = matchesSearch(item, searchQuery);
          return byFilter && bySearch;
        });

        if (items.length === 0) return null;

        return (
          <section className="menu-section" key={cat.id}>
            <div className="container">
              <div className="section-heading">
                <img
                  src={cat.icon}
                  alt={cat.title}
                  className="section-icon"
                />
                <h2 className="section-title">{cat.title}</h2>
              </div>

              <div className="menu-card-grid">
                {items.map((item) => {
                  const favorite = isFavorite(item.id);
                  return (
                    <article
                      className="menu-card"
                      key={item.id}
                      data-category={item.category}
                    >
                      <div className="menu-card-image-wrapper">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="menu-card-image"
                          />
                        )}
                      </div>
                      <div className="menu-card-body">
                        <h3 className="menu-card-title">
                          {item.name}
                          <span className="item-amharic">
                            {" "}
                            [{item.nameAmharic}]
                          </span>
                        </h3>
                        <p className="menu-card-desc">{item.description}</p>

                        <div className="menu-card-meta">
                          <span className="menu-card-price">
                            {item.price} <span className="item-amharic">ብር</span>
                          </span>
                          <button
                            type="button"
                            className={`menu-item-favorite-btn ${favorite ? "heart-filled" : ""
                              }`}
                            aria-label={
                              favorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                            onClick={() => toggleFavorite(item.id)}
                          >
                            {favorite ? <FaHeart /> : <FaRegHeart />}
                          </button>
                        </div>

                        <button
                          type="button"
                          className="menu-item-add-btn"
                          onClick={() => addToCart(item.id, 1)}
                        >
                          <FaShoppingBag /> Add to Cart
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
};

export default MenuGrid;
