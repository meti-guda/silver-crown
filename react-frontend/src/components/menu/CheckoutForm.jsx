
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { api } from '../../api';


const CheckoutForm = ({ isOpen, onClose, cartItems, cartTotal, onSuccess }) => {
     const [formData, setFormData] = useState({
          name: '',
          phone: '',
          method: 'pickup',
          preferredTime: '',
          address: ''
     });

     const [errors, setErrors] = useState({});
     const [isSubmitting, setIsSubmitting] = useState(false);

     const validateForm = () => {
          const newErrors = {};

          if (!formData.name.trim()) {
               newErrors.name = 'Name is required';
          }

          if (!formData.phone.trim()) {
               newErrors.phone = 'Phone number is required';
          } else if (!/^\d{9,}$/.test(formData.phone.replace(/\D/g, ''))) {
               newErrors.phone = 'Please enter a valid phone number';
          }

          if (formData.method === 'pickup') {
               if (!formData.preferredTime) {
                    newErrors.preferredTime = 'Please select a preferred time';
               }
          } else if (formData.method === 'delivery') {
               if (!formData.address.trim()) {
                    newErrors.address = 'Delivery address is required';
               }
               if (!formData.preferredTime) {
                    newErrors.preferredTime = 'Please select a preferred time';
               }
          }

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
               ...prev,
               [name]: value
          }));
          if (errors[name]) {
               setErrors((prev) => ({
                    ...prev,
                    [name]: ''
               }));
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!validateForm()) {
               return;
          }

          setIsSubmitting(true);

          try {
               const response = await api.submitOrder({
                    items: cartItems,
                    total: cartTotal,
                    customerName: formData.name,
                    phone: formData.phone,
                    method: formData.method,
                    address: formData.method === 'delivery' ? formData.address : null,
                    preferredTime: formData.preferredTime
               });

               if (response.success) {
                    onSuccess(response.orderId);
                    setFormData({
                         name: '',
                         phone: '',
                         method: 'pickup',
                         preferredTime: '',
                         address: ''
                    });
                    setErrors({});
                    onClose();
               } else {
                    setErrors({ submit: response.error || 'Failed to place order. Please try again.' });
               }
          } catch (error) {
               console.error('Order submission error:', error);
               setErrors({ submit: 'Error submitting order. Please check your connection.' });
          } finally {
               setIsSubmitting(false);
          }
     };

     if (!isOpen) return null;

     return (
          <>
               <div className="checkout-overlay" onClick={onClose} />
               <div className="checkout-modal">
                    <div className="checkout-header">
                         <h2>Complete Your Order</h2>
                         <button
                              className="checkout-close"
                              onClick={onClose}
                              aria-label="Close checkout"
                         >
                              <FaTimes />
                         </button>
                    </div>

                    <div className="checkout-body">
                         <form onSubmit={handleSubmit} noValidate>
                              <div className="form-group">
                                   <label htmlFor="checkout-name" className="form-label">
                                        Full Name
                                   </label>
                                   <input
                                        type="text"
                                        id="checkout-name"
                                        name="name"
                                        className={`form-control ${errors.name ? 'has-error' : ''}`}
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                   />
                                   {errors.name && (
                                        <p className="form-error" role="alert">
                                             {errors.name}
                                        </p>
                                   )}
                              </div>

                              <div className="form-group">
                                   <label htmlFor="checkout-phone" className="form-label">
                                        Phone Number
                                   </label>
                                   <input
                                        type="tel"
                                        id="checkout-phone"
                                        name="phone"
                                        className={`form-control ${errors.phone ? 'has-error' : ''}`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+251 9xx xxx xxx"
                                   />
                                   {errors.phone && (
                                        <p className="form-error" role="alert">
                                             {errors.phone}
                                        </p>
                                   )}
                              </div>

                              <fieldset className="form-group">
                                   <legend className="form-label">Delivery Method</legend>
                                   <div className="radio-group">
                                        <label className="radio-label">
                                             <input
                                                  type="radio"
                                                  name="method"
                                                  value="pickup"
                                                  checked={formData.method === 'pickup'}
                                                  onChange={handleChange}
                                             />
                                             <span>Pickup at Café</span>
                                        </label>
                                        <label className="radio-label">
                                             <input
                                                  type="radio"
                                                  name="method"
                                                  value="delivery"
                                                  checked={formData.method === 'delivery'}
                                                  onChange={handleChange}
                                             />
                                             <span>Delivery</span>
                                        </label>
                                   </div>
                              </fieldset>

                              {formData.method === 'delivery' && (
                                   <div className="form-group">
                                        <label htmlFor="checkout-address" className="form-label">
                                             Delivery Address
                                        </label>
                                        <textarea
                                             id="checkout-address"
                                             name="address"
                                             className={`form-control ${errors.address ? 'has-error' : ''}`}
                                             value={formData.address}
                                             onChange={handleChange}
                                             placeholder="Street, building, apartment, etc."
                                             rows="3"
                                        />
                                        {errors.address && (
                                             <p className="form-error" role="alert">
                                                  {errors.address}
                                             </p>
                                        )}
                                   </div>
                              )}

                              <div className="form-group">
                                   <label htmlFor="checkout-time" className="form-label">
                                        Preferred Time
                                   </label>
                                   <input
                                        type="time"
                                        id="checkout-time"
                                        name="preferredTime"
                                        className={`form-control ${errors.preferredTime ? 'has-error' : ''}`}
                                        value={formData.preferredTime}
                                        onChange={handleChange}
                                        min="09:00"
                                        max="20:00"
                                   />
                                   {errors.preferredTime && (
                                        <p className="form-error" role="alert">
                                             {errors.preferredTime}
                                        </p>
                                   )}
                              </div>

                              <div className="checkout-summary">
                                   <div className="summary-row">
                                        <span>Items ({cartItems.length})</span>
                                        <span className="price">${cartTotal.toFixed(2)}</span>
                                   </div>
                                   <div className="summary-row total">
                                        <span>Total</span>
                                        <span className="price">${cartTotal.toFixed(2)}</span>
                                   </div>
                              </div>

                              {errors.submit && (
                                   <div className="form-error form-error-block" role="alert">
                                        {errors.submit}
                                   </div>
                              )}

                              <button
                                   type="submit"
                                   className="btn primary-btn checkout-submit"
                                   disabled={isSubmitting}
                              >
                                   {isSubmitting ? 'Placing Order...' : 'Place Order'}
                              </button>

                              <button
                                   type="button"
                                   className="btn secondary-btn checkout-cancel"
                                   onClick={onClose}
                                   disabled={isSubmitting}
                              >
                                   Cancel
                              </button>
                         </form>
                    </div>
               </div>
          </>
     );
};

export default CheckoutForm;
