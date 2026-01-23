import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export const AuthDebug: React.FC = () => {
  const { user, loading } = useAuth();
  const { isAuthenticated, user: reduxUser } = useSelector((state: RootState) => state.auth);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="space-y-1">
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
        <div>AuthContext User: {user ? user.email : 'None'}</div>
        <div>Redux User: {reduxUser ? reduxUser.email : 'None'}</div>
      </div>
    </div>
  );
};
