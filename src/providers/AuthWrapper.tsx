import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '@/lib/store';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const UNAUTHENTICATED_PAGES = ['/', '/login'];
const DEFAULT_AUTH_PAGE = '/emergency'; // Default page for authenticated users

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return; // Wait for the authentication status to resolve

    const isOnUnauthenticatedPage = UNAUTHENTICATED_PAGES.includes(location.pathname);

    console.log(isAuthenticated)

    if (isAuthenticated && isOnUnauthenticatedPage) {
      // Redirect authenticated users away from unauthenticated pages
      navigate(DEFAULT_AUTH_PAGE, { replace: true });
    } else if (!isAuthenticated && !isOnUnauthenticatedPage) {
      // Redirect unauthenticated users trying to access protected pages
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white/50">
        <LoadingSpinner />
      </div>
    ); // Optional loading indicator while checking auth state
  }

  return <>{children}</>;
};
