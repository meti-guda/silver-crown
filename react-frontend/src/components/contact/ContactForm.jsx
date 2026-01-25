import React, { useState } from 'react';
import { api } from '../../api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.submitContact(
        formData.name,
        formData.email,
        formData.message
      );

      if (response.success) {
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setSuccessMessage('Thank you! Your message has been received. We will get back to you soon.');
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setErrors({ submit: response.error || 'Failed to send message' });
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setErrors({ submit: 'Error submitting form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {errors.submit && (
        <div className="form-error form-error-block" role="alert">
          {errors.submit}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          className={`form-control ${errors.name ? 'has-error' : ''}`}
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="form-error" data-error-for="contact-name">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          className={`form-control ${errors.email ? 'has-error' : ''}`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="form-error" data-error-for="contact-email">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          className={`form-control ${errors.message ? 'has-error' : ''}`}
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && (
          <p className="form-error" data-error-for="contact-message">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn primary-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>

      {successMessage && (
        <p id="contact-success" className="form-success" role="alert">
          {successMessage}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
