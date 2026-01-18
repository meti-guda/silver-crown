import {
  menuItems,
  getItemsByCategory,
  searchItems,
  getItemById,
} from "./menu-data.js";
import { favoritesManager, cartManager } from "./state-manager.js";

const navLinks = document.querySelectorAll(".nav-links a, .nav-drawer a");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.querySelector("#menu-search-input");
const searchIconBtn = document.querySelector(".menu-search-icon-btn");
const clearSearchBtn = document.querySelector(".menu-search-clear");
const navbarCartBtn = document.getElementById("navbar-cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
const cartDrawerClose = document.getElementById("cart-drawer-close");
const menuSectionsContainer = document.getElementById(
  "menu-sections-container"
);
const specialListContainer = document.getElementById("special-list");
const cartBadge = document.getElementById("cart-badge");

const navToggle = document.getElementById("nav-toggle");
const navDrawer = document.querySelector(".nav-drawer");

if (navToggle && navDrawer) {
  navDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.checked = false;
    });
  });
}

let activeFilter = "all";
let searchQuery = "";

function showToast(message, duration = 3000) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function initActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const hrefFile = href.split("/").pop();

    const isMenu = hrefFile === "menu.html";
    const onMenu = currentPath === "menu.html";

    link.classList.toggle("active", isMenu && onMenu);
  });
}

function renderMenuItem(item) {
  const isFavorite = favoritesManager.isFavorite(item.id);
  const heartIcon = isFavorite ? "fa-solid" : "fa-regular";
  const heartClass = isFavorite ? "heart-filled" : "";

  return `
    <div class="menu-row" data-category="${item.category}" data-item-id="${
    item.id
  }">
      <div class="menu-text">
        <h3>
          ${item.name}
          <span class="item-amharic">[${item.nameAmharic}]</span>
        </h3>
        <p>${item.description}</p>
      </div>
      <div class="menu-price">
        ${item.price} <span class="item-amharic">ብር</span>
      </div>
      <div class="menu-actions">
        <button 
          class="menu-item-favorite-btn ${heartClass}" 
          data-item-id="${item.id}"
          aria-label="${
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }"
          title="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
        >
          <i class="${heartIcon} fa-heart"></i>
        </button>
        <button 
          class="menu-item-add-btn" 
          data-item-id="${item.id}"
          aria-label="Add to cart"
        >
          <i class="fa-solid fa-plus"></i> Add
        </button>
      </div>
    </div>
  `;
}

function renderMenuSections() {
  menuSectionsContainer.innerHTML = "";

  const categories = [
    { id: "hot", title: "Hot Drinks", icon: "images/jebena.png" },
    { id: "cold", title: "Cold Drinks", icon: "images/iced_coffee.png" },
    { id: "baked", title: "Baked Goods", icon: "images/pastries.png" },
  ];

  categories.forEach((category) => {
    const items = getItemsByCategory(category.id);

    const filteredItems = items.filter((item) => {
      const matchesCategory =
        activeFilter === "all" || category.id === activeFilter;
      const lowerQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !lowerQuery ||
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery);
      return matchesCategory && matchesSearch;
    });

    if (filteredItems.length === 0) return;

    const section = document.createElement("section");
    section.className = "menu-section";
    section.innerHTML = `
      <div class="container">
        <div class="section-heading">
          <img src="${category.icon}" alt="${
      category.title
    }" class="section-icon" />
          <h2 class="section-title">${category.title}</h2>
        </div>
        <div class="menu-table ${category.id}-table">
          ${filteredItems.map((item) => renderMenuItem(item)).join("")}
        </div>
      </div>
    `;

    menuSectionsContainer.appendChild(section);

    section.querySelectorAll(".menu-item-add-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const item = getItemById(itemId);
        if (!item) return;
        cartManager.addToCart(item, 1);
        showToast(`${item.name} added to cart!`);
      });
    });

    section.querySelectorAll(".menu-item-favorite-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        favoritesManager.toggleFavorite(itemId);
      });
    });
  });
}

function renderSpecialMenu() {
  const specialItems = [
    {
      id: "hot-matcha",
      image: "images/matcha.png",
      price: 150,
      name: "Matcha",
      description: "Creamy Japanese green tea drink with a smooth finish.",
    },
    {
      id: "hot-milk-tea",
      image: "images/milk tea.png",
      price: 150,
      name: "Milk Tea",
      description: "Black tea with milk and sugar.",
    },
    {
      id: "cold-peach-tea",
      image: "images/peach tea.png",
      price: 90,
      name: "Peach Tea",
      description: "Refreshing peach tea.",
    },
    {
      id: "baked-strawberry-muffin",
      image: "images/Strawberry.png",
      price: 200,
      name: "Strawberry Muffin",
      description: "Moist muffin with fresh strawberries topping.",
    },
  ];

  specialListContainer.innerHTML = specialItems
    .map(
      (item) => `
        <article class="special-item">
          <img
            src="${item.image}"
            alt="${item.name}"
            class="special-image"
          />
          <div class="special-text">
            <div class="special-price">
              ${item.price} <span class="item-amharic">ብር</span>
            </div>
            <h3 class="special-name">${item.name}</h3>
            <p class="special-desc">${item.description}</p>
            <button 
              class="btn primary-btn special-add-btn"
              data-item-id="${item.id}"
            >
              <i class="fa-solid fa-shopping-bag"></i> Add to Cart
            </button>
          </div>
        </article>
      `
    )
    .join("");

  specialListContainer.querySelectorAll(".special-add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.dataset.itemId;
      const item = getItemById(itemId);
      if (item) {
        cartManager.addToCart(item, 1);
        showToast(`${item.name} added to cart!`);
      } else {
        console.warn("Special item id not found in menu-data:", itemId);
      }
    });
  });
}

function updateSearchIcons() {
  const hasText = searchQuery.trim().length > 0;
  if (searchIconBtn)
    searchIconBtn.style.visibility = hasText ? "hidden" : "visible";
  if (clearSearchBtn)
    clearSearchBtn.style.visibility = hasText ? "visible" : "hidden";
}

function applyFilters() {
  renderMenuSections();
  updateSearchIcons();
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    applyFilters();
  });
}

if (clearSearchBtn && searchInput) {
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    applyFilters();
    searchInput.focus();
  });
}

function wireClearCartModal(cartFooter) {
  const clearBtn = cartFooter.querySelector(".cart-clear-btn");
  if (!clearBtn) return;

  const modalOverlay = document.getElementById("cart-modal-overlay");
  const modalCancel = document.getElementById("cart-modal-cancel");
  const modalConfirm = document.getElementById("cart-modal-confirm");

  clearBtn.addEventListener("click", () => {
    if (!modalOverlay) return;
    modalOverlay.classList.add("show");
  });

  if (modalOverlay && modalCancel && modalConfirm) {
    modalCancel.onclick = () => {
      modalOverlay.classList.remove("show");
    };

    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("show");
      }
    };

    modalConfirm.onclick = () => {
      cartManager.clearCart();
      showToast("Cart cleared");
      modalOverlay.classList.remove("show");
    };
  }
}

function renderCart() {
  const cartItems = cartManager.getCart();
  const cartContent = document.getElementById("cart-drawer-content");
  const cartFooter = document.getElementById("cart-drawer-footer");

  if (cartItems.length === 0) {
    cartContent.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-shopping-bag"></i>
        <p>Your cart is empty</p>
        <p class="cart-empty-hint">Add items from the menu to get started!</p>
      </div>
    `;
    cartFooter.innerHTML = "";
  } else {
    const total = cartManager.getCartTotal();

    cartContent.innerHTML = `
      <div class="cart-items">
        ${cartItems
          .map(
            (item) => `
          <div class="cart-item">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p class="cart-item-price">${item.price} ብር each</p>
            </div>
            <div class="cart-item-controls">
              <button 
                class="cart-qty-btn" 
                data-item-id="${item.id}"
                data-action="decrease"
              >
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="cart-qty">${item.quantity}</span>
              <button 
                class="cart-qty-btn" 
                data-item-id="${item.id}"
                data-action="increase"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <div class="cart-item-total">${item.price * item.quantity} ብር</div>
            <button 
              class="cart-item-remove"
              data-item-id="${item.id}"
              aria-label="Remove item"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    cartFooter.innerHTML = `
      <div class="cart-summary">
        <div class="cart-total">
          <span>Total:</span>
          <span class="cart-total-price">${total} ብር</span>
        </div>
        <button class="btn primary-btn cart-checkout-btn">
          <i class="fa-solid fa-credit-card"></i> Proceed to Order
        </button>
        <button class="btn secondary-btn cart-clear-btn">Clear Cart</button>
      </div>
    `;

    cartContent.querySelectorAll(".cart-qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const action = btn.dataset.action;
        const currentItem = cartItems.find((i) => i.id === itemId);
        const newQty =
          action === "increase"
            ? currentItem.quantity + 1
            : currentItem.quantity - 1;
        cartManager.updateQuantity(itemId, newQty);
      });
    });

    cartContent.querySelectorAll(".cart-item-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const itemId = btn.dataset.itemId;
        const item = cartItems.find((i) => i.id === itemId);
        cartManager.removeFromCart(itemId);
        showToast(`${item.name} removed from cart`);
      });
    });

    wireClearCartModal(cartFooter);

    cartFooter
      .querySelector(".cart-checkout-btn")
      .addEventListener("click", () => {
        showToast(
          "This feature is coming soon! For now, note your order and visit us 😊"
        );
      });
  }

  const count = cartManager.getCartItemCount();
  cartBadge.textContent = count;
}

function toggleCartDrawer() {
  cartDrawer.classList.toggle("open");
  cartDrawerOverlay.classList.toggle("open");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("open");
  cartDrawerOverlay.classList.remove("open");
}

navbarCartBtn.addEventListener("click", toggleCartDrawer);
cartDrawerClose.addEventListener("click", closeCartDrawer);
cartDrawerOverlay.addEventListener("click", closeCartDrawer);

cartManager.subscribe(() => {
  renderCart();
});

favoritesManager.subscribe(() => {
  renderMenuSections();
});

function init() {
  initActiveNav();
  renderSpecialMenu();
  renderMenuSections();
  renderCart();
  updateSearchIcons();
}

document.addEventListener("DOMContentLoaded", init);
