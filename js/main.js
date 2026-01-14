// NAV ACTIVE STATE (all pages)
const navLinks = document.querySelectorAll(".nav-links a, .nav-drawer a");

const currentPath = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  const hrefFile = href.split("/").pop();

  const isHome = hrefFile === "index.html";
  const isMenu = hrefFile === "menu.html";
  const isContact = hrefFile === "contact.html";

  const onHome = currentPath === "" || currentPath === "index.html";
  const onMenu = currentPath === "menu.html";
  const onContact = currentPath === "contact.html";

  let shouldBeActive = false;
  if (onHome && isHome) shouldBeActive = true;
  if (onMenu && isMenu) shouldBeActive = true;
  if (onContact && isContact) shouldBeActive = true;

  link.classList.toggle("active", shouldBeActive);
});

// MENU CATEGORY FILTERS + SEARCH
const filterButtons = document.querySelectorAll(".filter-btn");
const menuRows = document.querySelectorAll(".menu-row");
const searchInput = document.querySelector("#menu-search-input");
const iconBtn = document.querySelector(".menu-search-icon-btn");
const clearSearchBtn = document.querySelector(".menu-search-clear");

let activeFilter = "all";
let searchQuery = "";

function applyMenuFilters() {
  const query = searchQuery.trim().toLowerCase();

  menuRows.forEach((row) => {
    const category = row.getAttribute("data-category");
    const textContent = row.textContent.toLowerCase();

    const matchesCategory = activeFilter === "all" || category === activeFilter;
    const matchesSearch = query === "" || textContent.includes(query);

    if (matchesCategory && matchesSearch) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

if (filterButtons.length && menuRows.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyMenuFilters();
    });
  });
}

function updateSearchIcons() {
  const hasText = searchQuery.trim().length > 0;

  if (iconBtn) {
    iconBtn.style.visibility = hasText ? "hidden" : "visible";
  }
  if (clearSearchBtn) {
    clearSearchBtn.style.visibility = hasText ? "visible" : "hidden";
  }
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    applyMenuFilters();
    updateSearchIcons();
  });
}

if (clearSearchBtn && searchInput) {
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    applyMenuFilters();
    updateSearchIcons();
    searchInput.focus();
  });
}

updateSearchIcons();
