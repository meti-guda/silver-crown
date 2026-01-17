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

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a, .nav-drawer a");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const hrefFile = href.split("/").pop();
    const isContact = hrefFile === "contact.html";
    const isMenu = hrefFile === "menu.html";
    const isHome = hrefFile === "index.html";

    const onContact = currentPath === "contact.html";
    const onMenu = currentPath === "menu.html";
    const onHome = currentPath === "index.html";

    const shouldBeActive =
      (isContact && onContact) || (isMenu && onMenu) || (isHome && onHome);

    if (shouldBeActive) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const navToggle = document.getElementById("nav-toggle");
  const navDrawer = document.querySelector(".nav-drawer");

  if (navToggle && navDrawer) {
    navDrawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.checked = false;
      });
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");
  const successEl = document.getElementById("contact-success");

  function showError(input, message) {
    const errorEl = document.querySelector(
      `.form-error[data-error-for="${input.id}"]`
    );
    if (errorEl) {
      errorEl.textContent = message;
    }
    input.classList.add("has-error");
  }

  function clearError(input) {
    const errorEl = document.querySelector(
      `.form-error[data-error-for="${input.id}"]`
    );
    if (errorEl) {
      errorEl.textContent = "";
    }
    input.classList.remove("has-error");
  }

  function validateEmail(value) {
    // Simple email check
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
  }

  function validateForm() {
    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, "Please enter your name.");
      valid = false;
    } else {
      clearError(nameInput);
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, "Please enter your email.");
      valid = false;
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address.");
      valid = false;
    } else {
      clearError(emailInput);
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, "Please enter a message.");
      valid = false;
    } else {
      clearError(messageInput);
    }

    return valid;
  }

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      clearError(input);
      if (successEl) successEl.textContent = "";
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (successEl) successEl.textContent = "";
      return;
    }

    contactForm.reset();
    if (successEl) {
      successEl.textContent =
        "Thank you! Your message has been received. We will get back to you soon.";
    }
  });
});
