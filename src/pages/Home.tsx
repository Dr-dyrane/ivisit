import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import ProtocolFlow from '../components/home/ProtocolFlow';
import EarlyAccessCTA from '../components/home/EarlyAccessCTA';
import Contact from '../components/home/Contact';
import TrustSignals from '../components/home/TrustSignals';
import StrategicAdvantage from '../components/home/StrategicAdvantage';
import ProviderShowcase from '../components/home/ProviderShowcase';

const Home = () => {
  useEffect(() => {
    document.title = "iVisit | Command-Grade Medical Dispatch & Response";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "iVisit delivers ultra-rapid medical dispatch and hospital bed booking with real-time tactical intelligence. 5-minute ETA response protocols.");
    }

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.slice(1);
        if (targetId) {
          // Add a small delay to ensure the element is rendered
          setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              const navbarHeight = 80; // Account for fixed navbar
              const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - navbarHeight;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }, 100);
        }
      }
    };

    // Handle initial hash in URL
    const handleInitialHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          const targetElement = document.getElementById(hash);
          if (targetElement) {
            const navbarHeight = 80;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 500);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    handleInitialHash(); // Handle initial page load with hash

    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <main className='flex-grow mt-20 min-h-screen'>
      <Hero />
      <TrustSignals />
      <Services />
      <StrategicAdvantage />
      <ProviderShowcase />
      <ProtocolFlow />
      <EarlyAccessCTA />
      <Contact />
    </main>
  );
};

export default Home;

