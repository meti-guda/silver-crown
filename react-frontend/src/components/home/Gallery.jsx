// src/components/home/Gallery.jsx
import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Gallery = () => {
  const titleRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <h2 className="section-title scroll-reveal" ref={titleRef}>
          Gallery
        </h2>

        <div className="gallery-grid scroll-reveal" ref={gridRef}>
          <figure>
            <img src="/images/4.jpg" alt="Barista making coffee" />
          </figure>
          <figure>
            <img src="/images/3.jpg" alt="Pastries on display" />
          </figure>
          <figure>
            <img src="/images/2.jpg" alt="Coffee cup closeup" />
          </figure>
          <figure>
            <img src="/images/5.png" alt="Tea Bags" />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
