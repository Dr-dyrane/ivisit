import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from "@/lib/store";

import { AuthWrapper } from './AuthWrapper';
import { AuthProvider } from '../contexts/AuthContext';
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [storeConfig, setStoreConfig] = useState<{
    store: ReturnType<typeof createStore>["store"];
    persistor: ReturnType<typeof createStore>["persistor"];
  } | null>(null);

  useEffect(() => {
    // Dynamically fetch or set userId here
    const config = createStore(); // Dynamically create store based on userId
    setStoreConfig(config);
  }, []);

  if (!storeConfig) {
    return <LoadingSpinner />; // Render loader until store is initialized
  }
  
  const { store, persistor } = storeConfig;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <AuthWrapper>{children}</AuthWrapper> {/* Use AuthWrapper to handle auth redirection */}
              </Router>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

