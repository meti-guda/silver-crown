import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getItemById } from "../../data/menuItems";

const FAVORITES_STORAGE_KEY = "silvercrown_favorites";
const CART_STORAGE_KEY = "silvercrown_cart";

const MenuContext = createContext(null);

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
};

export const MenuProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message, duration = 3000) => {
    setToast(message);
    if (message) {
      setTimeout(() => setToast(null), duration);
    }
  };

  const toggleFavorite = (itemId) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isFavorite = (itemId) => favorites.includes(itemId);

  const addToCart = (itemId, qty = 1) => {
    const item = getItemById(itemId);
    if (!item) return;

    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === itemId);
      if (existing) {
        return prev.map((c) =>
          c.id === itemId ? { ...c, quantity: c.quantity + qty } : c
        );
      }
      return [
        ...prev,
        { id: item.id, name: item.name, price: item.price, quantity: qty },
      ];
    });
    showToast(`${item.name} added to cart!`);
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === itemId);
      if (!existing) return prev;
      if (quantity <= 0) {
        return prev.filter((c) => c.id !== itemId);
      }
      return prev.map((c) =>
        c.id === itemId ? { ...c, quantity } : c
      );
    });
  };

  const removeFromCart = (itemId) => {
    const item = getItemById(itemId);
    setCartItems((prev) => prev.filter((c) => c.id !== itemId));
    if (item) showToast(`${item.name} removed from cart`);
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
    [cartItems]
  );

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    toast,
    showToast,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
