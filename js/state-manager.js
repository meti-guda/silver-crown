const FAVORITES_STORAGE_KEY = "silvercrown_favorites";
const CART_STORAGE_KEY = "silvercrown_cart";

class FavoritesManager {
  constructor() {
    this.favorites = new Set(this.loadFavorites());
  }

  loadFavorites() {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn("Failed to load favorites:", e);
      return [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify([...this.favorites])
      );
    } catch (e) {
      console.warn("Failed to save favorites:", e);
    }
  }

  addFavorite(itemId) {
    this.favorites.add(itemId);
    this.saveFavorites();
    this.notifyListeners();
  }

  removeFavorite(itemId) {
    this.favorites.delete(itemId);
    this.saveFavorites();
    this.notifyListeners();
  }

  toggleFavorite(itemId) {
    if (this.favorites.has(itemId)) {
      this.removeFavorite(itemId);
    } else {
      this.addFavorite(itemId);
    }
  }

  isFavorite(itemId) {
    return this.favorites.has(itemId);
  }

  getFavorites() {
    return Array.from(this.favorites);
  }

  clearFavorites() {
    this.favorites.clear();
    this.saveFavorites();
    this.notifyListeners();
  }

  listeners = [];

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach((callback) => callback());
  }
}

class CartManager {
  constructor() {
    this.items = this.loadCart();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn("Failed to load cart:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Failed to save cart:", e);
    }
  }

  addToCart(item, quantity = 1) {
    const existing = this.items.find((cartItem) => cartItem.id === item.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
      });
    }

    this.saveCart();
    this.notifyListeners();
  }

  removeFromCart(itemId) {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.saveCart();
    this.notifyListeners();
  }

  updateQuantity(itemId, quantity) {
    const item = this.items.find((i) => i.id === itemId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.notifyListeners();
      }
    }
  }

  getCart() {
    return [...this.items];
  }

  getCartTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getCartItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.notifyListeners();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  listeners = [];

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach((callback) => callback());
  }
}

export const favoritesManager = new FavoritesManager();
export const cartManager = new CartManager();

export function formatPrice(price) {
  return `${price} ብር`;
}
