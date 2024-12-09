import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, User, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-background rounded-r-xl shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-2xl font-semibold">iVisit</span>
          <button onClick={onClose} className="md:hidden">
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
  );
};

export default Sidebar;

