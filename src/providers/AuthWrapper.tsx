import React from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>;
};
