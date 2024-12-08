import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import Services from './components/home/Services';
import Contact from './components/home/Contact';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { ThemeProvider } from './providers/ThemeContext';
import { ErrorBoundary } from './providers/ErrorBoundary';
import AmbulanceCall from './components/ambulance/AmbulanceCall';
import BedBooking from './components/bed-booking/BedBooking';

function App() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <animated.div style={fadeIn} className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={
                  <main className="flex-grow mt-20">
                    <Hero />
                    <Services />
                    <Contact />
                  </main>
                } />
                <Route path="/emergency" element={<AmbulanceCall />} />
                <Route path="/book-bed" element={<BedBooking />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            <Footer />
          </animated.div>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;