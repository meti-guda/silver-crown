// src/hooks/useActiveLink.js
import { useLocation } from "react-router-dom";

export const useActiveLink = () => {
  const location = useLocation();
  const currentPath = location.pathname || "/";

  const isActive = (href) => {
    // Normalize href from HTML-style links to React paths
    // e.g. "index.html" -> "/", "menu.html" -> "/menu"
    let normalizedHref = href;

    if (href === "index.html") {
      normalizedHref = "/";
    } else if (href.endsWith(".html")) {
      normalizedHref = `/${href.replace(".html", "")}`;
    }

    // Handle relative vs absolute
    if (!normalizedHref.startsWith("/")) {
      normalizedHref = `/${normalizedHref}`;
    }

    // Exact match for these simple routes
    return currentPath === normalizedHref;
  };

  return { isActive };
};
