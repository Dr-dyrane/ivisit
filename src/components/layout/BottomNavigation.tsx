import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  return (
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
          <span className="text-xs mt-1">Account</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;

