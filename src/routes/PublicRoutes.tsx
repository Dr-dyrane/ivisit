import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const PublicRoutes: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow mt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

