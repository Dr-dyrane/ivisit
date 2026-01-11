import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import ProtocolFlow from '../components/home/ProtocolFlow';
import Contact from '../components/home/Contact';

const Home: React.FC = () => (
  <main className='flex-grow mt-20 min-h-screen justify-center items-center'>
    <Hero />
    <Services />
    <ProtocolFlow />
    <Contact />
  </main>
);

export default Home;

