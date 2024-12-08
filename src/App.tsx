import React, { Suspense } from 'react';
import { useSpring, animated } from '@react-spring/web';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { Providers } from './providers';
import { AppRouter } from './routes/AppRouter';

function App() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 }
  });

  return (
    <Providers>
      <animated.div style={fadeIn} className="min-h-screen flex flex-col bg-background text-foreground">
        <Suspense fallback={<LoadingSpinner />}>
          <AppRouter />
        </Suspense>
      </animated.div>
    </Providers>
  );
}

export default App;

