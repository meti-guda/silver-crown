import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const MenuFilters = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => {
  const filters = [
    { id: "all", label: "All" },
    { id: "hot", label: "Hot" },
    { id: "cold", label: "Cold" },
    { id: "baked", label: "Baked" },
  ];

  const hasText = searchQuery.trim().length > 0;

  return (
    <>
      <section className="menu-header">
        <div className="container">
          <h1>Our Menu</h1>
          <p>Everything handcrafted with precision and passion.</p>
        </div>
      </section>

      <section className="menu-search">
        <div className="container">
          <label htmlFor="menu-search-input" className="menu-search-label">
            Search the menu
          </label>
          <div className="menu-search-wrapper">
            <input
              type="text"
              id="menu-search-input"
              className="menu-search-input"
              placeholder="Search by drink, flavor, or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
              type="button"
              className="menu-search-icon-btn"
              aria-hidden="true"
              tabIndex={-1}
              style={{ visibility: hasText ? "hidden" : "visible" }}
            >
              <FaSearch />
            </button>
            <button
              type="button"
              className="menu-search-clear"
              aria-label="Clear search"
              onClick={onClearSearch}
              style={{ visibility: hasText ? "visible" : "hidden" }}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </section>

      <section className="menu-filters">
        <div className="container">
          <div className="menu-filters-inner">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`filter-btn ${
                  activeFilter === f.id ? "active" : ""
                }`}
                onClick={() => onFilterChange(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MenuFilters;
