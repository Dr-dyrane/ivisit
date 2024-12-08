import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';

// Placeholder for future Redux Provider
// import { Provider } from 'react-redux';
// import { store } from './store';
// import { AuthWrapper } from './AuthWrapper';


export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          {/* <AuthWrapper> */}
            {/* Placeholder for future Redux Provider */}
            {/* <Provider store={store}> */}
              {children}
            {/* </Provider> */}
          {/* </AuthWrapper> */}
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

