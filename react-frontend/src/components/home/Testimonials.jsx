import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Testimonials = () => {
  const titleRef = useScrollReveal();

  const testimonials = [
    {
      id: 1,
      stars: '★★★★★',
      text: '"My mornings in Piassa start here. Their jebena buna and fresh croissant taste like home but better."',
      name: 'Meron',
      extraClass: 'slide-left',
    },
    {
      id: 2,
      stars: '★★★★★',
      text: '"After visiting Adwa Museum, we always stop by Silver Crown for matcha and strawberry muffins. It\'s our family tradition now."',
      name: 'Dawit',
      extraClass: '',
    },
    {
      id: 3,
      stars: '★★★★',
      text: '"Soft jazz, the smell of roasted beans, and staff who remember my order — easily my favorite cafe in Addis."',
      name: 'Selam',
      extraClass: 'slide-right',
    },
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title scroll-reveal" ref={titleRef}>
          What Our Customers Say
        </h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const cardRef = useScrollReveal();

  return (
    <div
      className={`testimonial-card scroll-reveal ${testimonial.extraClass}`}
      ref={cardRef}
    >
      <div className="stars">{testimonial.stars}</div>
      <p>{testimonial.text}</p>
      <p className="customer-name">— {testimonial.name}</p>
    </div>
  );
};

export default Testimonials;
