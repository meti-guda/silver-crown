const API_URL = "http://localhost:7880/api";

export const api = {
  // contacts
  submitContact: async (name, email, message) => {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      return await response.json();
    } catch (error) {
      console.error("Contact API error:", error);
      throw error;
    }
  },

  // orders
  submitOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      return await response.json();
    } catch (error) {
      console.error("Order API error:", error);
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      return await response.json();
    } catch (error) {
      console.error("Get orders API error:", error);
      throw error;
    }
  },

  // menu
  getMenu: async () => {
    try {
      const response = await fetch(`${API_URL}/menu`);
      return await response.json();
    } catch (error) {
      console.error("Menu API error:", error);
      throw error;
    }
  },
};
