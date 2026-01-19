import React, { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import SpecialMenu from "../menu/SpecialMenu";
import MenuFilters from "../menu/MenuFilters";
import MenuGrid from "../menu/MenuGrid";
import CartDrawer from "../menu/CartDrawer";
import ToastContainer from "../menu/ToastContainer";
import { MenuProvider } from "../menu/MenuContext";
import { useMenu } from "../menu/MenuContext";

const MenuPageContent = () => {
  const { cartCount } = useMenu();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} 
        cartCount={cartCount}/>
      <SpecialMenu />
      <MenuFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery("")}
      />
      <MenuGrid activeFilter={activeFilter} searchQuery={searchQuery} />

      <section className="quality-info">
        <div className="container">
          <h2 className="section-title">Quality & Freshness</h2>
          <div className="quality-grid">
            <div className="quality-badge">🌾 Freshly baked every morning</div>
            <div className="quality-badge">☕ Local coffee</div>
            <div className="quality-badge">🤎 No artificial flavors</div>
          </div>
          <p className="quality-note">
            We bake in small batches in the morning and serve coffee with
            carefully selected beans. Ask staff about ingredients if you have
            any concerns.
          </p>
        </div>
      </section>

      <Footer />
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ToastContainer />
    </>
  );
};

const MenuPage = () => (
  <MenuProvider>
    <MenuPageContent />
  </MenuProvider>
);

export default MenuPage;
