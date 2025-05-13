
import React from 'react';
import Hero from '@/components/Hero';
import DestinationSection from '@/components/DestinationSection';
import FeaturedAccommodations from '@/components/FeaturedAccommodations';
import WhyChooseUs from '@/components/WhyChooseUs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <DestinationSection />
      <FeaturedAccommodations />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Home;
