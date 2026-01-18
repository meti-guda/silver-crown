// src/components/home/About.jsx
import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const About = () => {
  const headingRef = useScrollReveal();
  const imagesRef = useScrollReveal();

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="scroll-reveal" ref={headingRef}>Our Story</h2>
            <p>
              Silver Crown is a quiet escape just off Adwa Museum, where the
              sounds of Piassa mix with the clink of cups and the smell of
              coffee and freshly baked goods.
            </p>
            <p>
              Beans are sourced from local growers then roasted in small batches
              and brewed the classic way in jebena or in espresso form. There
              are also many more cold and hot drink options. In the pastry case,
              you&apos;ll find a mix of croissants, seasonal cakes and sweets.
            </p>
            <p className="muted">
              Open daily in Piassa, a short walk from Adwa Museum. Go to the
              contact page for hours, directions and parking.
            </p>
          </div>

          <div className="about-images scroll-reveal" ref={imagesRef}>
            <img src="/images/1.jpg" alt="Cafe interior" />
            <img src="/images/01.jpg" alt="Cafe interior" />
            <img src="/images/02.jpg" alt="Cafe interior" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
