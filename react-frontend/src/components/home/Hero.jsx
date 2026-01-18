// src/components/home/Hero.jsx
import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Hero = () => {
  const titleRef = useScrollReveal();
  const subtitleRef = useScrollReveal();
  const buttonsRef = useScrollReveal();
  const imageRef = useScrollReveal();

  return (
    <header id="hero" className="hero">
      <div className="hero-inner container">
        <div className="hero-text">
          <h1 className="hero-title scroll-reveal" ref={titleRef}>
            Coffee &amp; pastries in the heart of Piassa.
          </h1>
          <p className="hero-sub scroll-reveal" ref={subtitleRef}>
            A cozy corner near Adwa Museum serving Ethiopian coffee, tasty
            pastries and peaceful times with friends.
          </p>
          <div className="hero-btn scroll-reveal" ref={buttonsRef}>
            <a href="/menu" className="btn primary-btn">Explore Menu</a>
            <a href="/contact" className="btn secondary-btn">Plan Your Visit</a>
          </div>
        </div>
        <div className="hero-image scroll-reveal" ref={imageRef} aria-hidden="true">
          <img
            src="/images/0.jpg"
            alt="Cappuccino and pastry on wooden table"
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
