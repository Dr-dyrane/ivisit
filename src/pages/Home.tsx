import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import ProtocolFlow from '../components/home/ProtocolFlow';
import EarlyAccessCTA from '../components/home/EarlyAccessCTA';
import Contact from '../components/home/Contact';
import TrustSignals from '../components/home/TrustSignals';
import StrategicAdvantage from '../components/home/StrategicAdvantage';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "iVisit | Command-Grade Medical Dispatch & Response";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "iVisit delivers ultra-rapid medical dispatch and hospital bed booking with real-time tactical intelligence. 5-minute ETA response protocols.");
    }
  }, []);

  return (
    <main className='flex-grow mt-20 min-h-screen'>
      <Hero />
      <TrustSignals />
      <Services />
      <StrategicAdvantage />
      <ProtocolFlow />
      <EarlyAccessCTA />
      <Contact />
    </main>
  );
};

export default Home;

