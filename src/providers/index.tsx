import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/lib/store';

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <ThemeProvider>
            <Router>
              {children}
            </Router>
          </ThemeProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

