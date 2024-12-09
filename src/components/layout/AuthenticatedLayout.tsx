import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import Sidebar from './Sidebar';
import FloatingActionButton from './FloatingActionButton';


export const AuthenticatedLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/emergency' || location.pathname === '/book-bed';

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {!isSidebarOpen && 
      <button onClick={() => setIsSidebarOpen(true)} className="fixed top-4 left-4 md:hidden rounded-full p-2 z-50 text-white bg-accent-500"
      >
        <Menu size={24} />
      </button>}


      <div className="flex-1 flex flex-col overflow-hidden">


        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background pb-10">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>

        <BottomNavigation />

        {isHomePage && <FloatingActionButton />}
      </div>
    </div>
  );
};

