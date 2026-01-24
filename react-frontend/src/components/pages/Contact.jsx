import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ContactForm from "../contact/ContactForm";
import ContactDetails from "../contact/ContactDetails";
import { useMenu } from "../menu/MenuContext";




const Contact = () => {
  const { cartCount } = useMenu();
  return (
    <main className="contact-page">
      <Navbar onCartClick={() => { }} cartCount={cartCount} />

      <section className="contact-intro">
        <div className="container">
          <h1 className="section-title">Visit Silver Crown</h1>
          <p>
            Find us in Piassa, a short walk from Adwa Museum, between
            neighborhood shops.
          </p>
        </div>
      </section>

      <section className="contact-grid">
        <div className="container">
          <ContactDetails />
        </div>
      </section>


      <section className="contact-form-section">
        <div className="container">
          <h2>Send us a message</h2>
          <p>
            Questions, special orders, or feedback? Send a quick note and we'll
            get back to you.
          </p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
