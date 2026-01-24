import React from 'react';
import Navbar from '../common/Navbar';
import Hero from '../home/Hero';
import About from '../home/About';
import Offerings from '../home/Offerings';
import Gallery from '../home/Gallery';
import Testimonials from '../home/Testimonials';
import Footer from '../common/Footer';
import { useMenu } from '../menu/MenuContext';


const Homepage = () => {
  const { cartCount } = useMenu();

  return (
    <>
      <Navbar onCartClick={() => { }} cartCount={cartCount} />
      <Hero />
      <About />
      <Offerings />
      <Gallery />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Homepage;
