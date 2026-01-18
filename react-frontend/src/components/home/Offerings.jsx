import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Offerings = () => {
  const titleRef = useScrollReveal();

  const offerings = [
    {
      id: 1,
      icon: '☕',
      title: 'Piassa Coffee Ritual',
      description:
        'Jebena buna poured tableside, served with popcorn or himbasha for an Addis‑style slow coffee moment.',
      extraClass: 'slide-left',
    },
    {
      id: 2,
      icon: '🥐',
      title: 'House Bakery Favorites',
      description:
        'Buttery croissants, strawberry muffins, and daily bakes best enjoyed warm from the oven.',
      extraClass: '',
    },
    {
      id: 3,
      icon: '✨',
      title: 'Adwa Museum Specials',
      description:
        'Limited drinks and desserts inspired by Ethiopian seasons and Piassa&apos;s vibrant streets.',
      extraClass: 'slide-right',
    },
  ];

  return (
    <section id="offerings" className="offerings">
      <div className="container">
        <h2 className="section-title scroll-reveal" ref={titleRef}>
          Signature Offerings
        </h2>
        <div className="offerings-grid">
          {offerings.map((offering) => (
            <OfferingCard key={offering.id} offering={offering} />
          ))}
        </div>
      </div>
    </section>
  );
};

const OfferingCard = ({ offering }) => {
  const cardRef = useScrollReveal();

  return (
    <article
      className={`offering-card scroll-reveal ${offering.extraClass}`}
      ref={cardRef}
    >
      <div className="offering-icon">{offering.icon}</div>
      <h3>{offering.title}</h3>
      <p>{offering.description}</p>
    </article>
  );
};

export default Offerings;
