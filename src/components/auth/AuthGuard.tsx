import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '@/lib/store';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const UNAUTHENTICATED_PAGES = ['/', '/login', '/privacy', '/terms', '/support', '/early-access', '/medical-disclaimer', '/health-data-consent'];
const DEFAULT_AUTH_PAGE = '/emergency';

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = DEFAULT_AUTH_PAGE 
}) => {
  const { isAuthenticated, loading: reduxLoading } = useSelector((state: RootState) => state.auth);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = reduxLoading || authLoading;
  const isOnUnauthenticatedPage = UNAUTHENTICATED_PAGES.includes(location.pathname);
  const hasUser = isAuthenticated || user;

  useEffect(() => {
    if (isLoading) return; // Wait for authentication to resolve

    if (hasUser && isOnUnauthenticatedPage) {
      // Redirect authenticated users away from public pages
      navigate(redirectTo, { replace: true });
    } else if (!hasUser && !isOnUnauthenticatedPage) {
      // Redirect unauthenticated users to login
      navigate('/login', { replace: true, state: { from: location.pathname } });
    }
  }, [hasUser, isLoading, isOnUnauthenticatedPage, location.pathname, navigate, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-sm font-light text-muted-foreground tracking-wide">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  // Only render children if user is authenticated or on public page
  if (hasUser || isOnUnauthenticatedPage) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
};
