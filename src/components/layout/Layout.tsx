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
            {!isAuthenticated && <Navbar />}
            <div className="flex flex-1 min-h-screen">
                {isAuthenticated && <Sidebar />}
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
            {isAuthenticated && <BottomNav />}
            {!isAuthenticated && <Footer />}
        </div>
    );
};

