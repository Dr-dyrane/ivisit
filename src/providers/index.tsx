import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';
import { AuthWrapper } from './AuthWrapper';

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <ThemeProvider>
            <Router>
              <AuthWrapper>{children}</AuthWrapper> {/* Use AuthWrapper to handle auth redirection */}
            </Router>
          </ThemeProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

