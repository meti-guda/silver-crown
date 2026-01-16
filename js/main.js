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
