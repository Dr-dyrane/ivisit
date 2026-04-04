import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ProtocolFlow from '../components/home/ProtocolFlow';
import EarlyAccessCTA from '../components/home/EarlyAccessCTA';
import TrustSignals from '../components/home/TrustSignals';
import ProviderShowcase from '../components/home/ProviderShowcase';

const Home = () => {
  useEffect(() => {
    document.title = 'iVisit | Emergency Medical Help, Faster';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'iVisit helps people request emergency medical response, check hospital bed availability, and share live location from one place.'
      );
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.slice(1);
        if (targetId) {
          setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              const navbarHeight = 80;
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
    handleInitialHash();

    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <main className="flex-grow mt-20 min-h-screen">
      <Hero />
      <TrustSignals />
      <ProtocolFlow />
      <ProviderShowcase />
      <EarlyAccessCTA />
    </main>
  );
};

export default Home;

