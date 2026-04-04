import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import { PreviewBridgeProvider } from './PreviewBridgeProvider';

export const MarketingLayout: React.FC = () => {
    return (
        <PreviewBridgeProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </PreviewBridgeProvider>
    );
};

