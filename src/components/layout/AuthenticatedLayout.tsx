import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Calendar, User } from 'lucide-react';


export const AuthenticatedLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    const isHomePage = location.pathname === '/emergency' || location.pathname === '/book-bed';

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between h-16 px-4 border-b">
                        <span className="text-2xl font-semibold">iVisit</span>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="flex-1 px-4 py-4">
                        <Link to="/emergency" className="flex items-center px-4 py-2 text-foreground hover:bg-accent rounded-md">
                            <Home className="mr-3" size={20} />
                            Home
                        </Link>
                        <Link to="/visits" className="flex items-center px-4 py-2 mt-2 text-foreground hover:bg-accent rounded-md">
                            <Calendar className="mr-3" size={20} />
                            Visits
                        </Link>
                        <Link to="/profile" className="flex items-center px-4 py-2 mt-2 text-foreground hover:bg-accent rounded-md">
                            <User className="mr-3" size={20} />
                            Profile
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main content */}
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

                {/* Bottom Navigation for Mobile */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
                    <div className="flex justify-around">
                        <Link to="/emergency" className="flex flex-col items-center py-2">
                            <Home size={24} />
                            <span className="text-xs mt-1">Home</span>
                        </Link>
                        <Link to="/visits" className="flex flex-col items-center py-2">
                            <Calendar size={24} />
                            <span className="text-xs mt-1">Visits</span>
                        </Link>
                        <Link to="/profile" className="flex flex-col items-center py-2">
                            <User size={24} />
                            <span className="text-xs mt-1">Profile</span>
                        </Link>
                    </div>
                </nav>

                {/* Floating Action Button */}
                {isHomePage && (
                    <button
                        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 "
                        onClick={() => {
                            // Toggle between Emergency and Book Bed
                            if (location.pathname === '/emergency') {
                                // Navigate to Book Bed
                                navigate('/book-bed');
                            } else {
                                // Navigate to Emergency
                                navigate('/emergency');
                            }
                        }}
                    >   <div className="relative group w-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-600 to-accent-500 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition duration-300"></div>
                            <div className="relative w-full px-6 py-3 bg-accent-600 text-white rounded-2xl text-base font-semibold hover:bg-accent-500 transition-colors text-center">
                                {location.pathname === '/emergency' ? 'Book-Bed' : 'SOS'}
                            </div>
                        </div>
                    </button>
                )
                }
            </div>
        </div >
    );
};

