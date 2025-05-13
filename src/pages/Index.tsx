
import React from 'react';
import Hero from '@/components/Hero';
import DestinationSection from '@/components/DestinationSection';
import FeaturedAccommodations from '@/components/FeaturedAccommodations';
// Altere esta linha:
import WhyChooseUs from '@/components/WhyChooseUs';
// Para esta:
import WhyChooseUs from '@/components/layout/WhyChooseUs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
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

export default Index;
