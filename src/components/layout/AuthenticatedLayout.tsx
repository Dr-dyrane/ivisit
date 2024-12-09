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

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-accent-500 shadow-sm h-16 flex items-center px-4">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
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

