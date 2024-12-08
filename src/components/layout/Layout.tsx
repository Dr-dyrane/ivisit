import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export const Layout: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      {isAuthenticated && <BottomNav />}
      <Footer />
    </div>
  );
};

