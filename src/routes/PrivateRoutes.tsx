import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import BottomNav from '../components/layout/BottomNav';

export const PrivateRoutes: React.FC = () => {


  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

