import React, { useState } from "react";
import {
  FaTimes,
  FaMinus,
  FaPlus,
  FaTrash,
  FaCreditCard,
  FaShoppingBag,
} from "react-icons/fa";
import { useMenu } from "./MenuContext";

const CartDrawer = ({ open, onClose }) => {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    showToast,
  } = useMenu();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("cart-drawer-overlay")) {
      onClose();
    }
  };

  const handleClearConfirm = () => {
    clearCart();
    showToast("Cart cleared");
    setShowClearModal(false);
  };

  return (
    <>
      <div className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h2>Shopping Cart</h2>
          <button
            className="cart-drawer-close"
            aria-label="Close cart"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <div className="cart-drawer-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div  className="i"><FaShoppingBag/></div>
              <p>Your cart is empty</p>
              <p className="cart-empty-hint">
                Add items from the menu to get started!
              </p>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{item.price} ብር each</p>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <FaMinus />
                    </button>
                    <span className="cart-qty">{item.quantity}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="cart-item-total">
                    {item.price * item.quantity} ብር
                  </div>
                  <button
                    className="cart-item-remove"
                    aria-label="Remove item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span className="cart-total-price">{cartTotal} ብር</span>
              </div>
              <button
                className="btn primary-btn cart-checkout-btn"
                onClick={() =>
                  showToast(
                    "This feature is coming soon! For now, note your order and visit us 😊"
                  )
                }
              >
                <FaCreditCard /> Proceed to Order
              </button>
              <button
                className="btn secondary-btn cart-clear-btn"
                onClick={() => setShowClearModal(true)}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`cart-drawer-overlay ${open ? "open" : ""}`}
        onClick={handleOverlayClick}
      />

      {showClearModal && (
        <div className="cart-modal-overlay show">
          <div className="cart-modal">
            <h3>Clear cart?</h3>
            <p>Do you want to remove all items from your cart?</p>
            <div className="cart-modal-actions">
              <button
                className="btn secondary-btn"
                onClick={() => setShowClearModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn primary-btn"
                onClick={handleClearConfirm}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
