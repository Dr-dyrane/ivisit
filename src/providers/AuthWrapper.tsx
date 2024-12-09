import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '@/lib/store';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const unauthenticatedPages = ['/', '/login'];

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (loading) return; // Wait until the authentication state is loaded

    const isUnauthenticatedPage = unauthenticatedPages.includes(currentPath);
    const isAuthenticatedPage = !isUnauthenticatedPage;

    if (isAuthenticated) {
      // Authenticated users navigating to unauthenticated pages
      if (isUnauthenticatedPage) {
        navigate('/emergency', { replace: true });
      }
    } else {
      // Unauthenticated users navigating to authenticated pages
      if (isAuthenticatedPage) {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  if (loading) {
    return <div className='min-h-screen flex justify-center items-center flex-1 bg-white/50'><LoadingSpinner/></div>; // Optional loading indicator while checking auth
  }

  return <>{children}</>; // Render children if no navigation rules are violated
};
