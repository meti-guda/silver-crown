import { useEffect, useRef } from "react";

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
      ...options,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("reveal-visible");
        observer.unobserve(node);
      }
    }, observerOptions);

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [options]);

  return ref;
};
