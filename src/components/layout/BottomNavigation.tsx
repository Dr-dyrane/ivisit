import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, isHomePage } from './navigation';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 ${
              (isHomePage(location.pathname) && isHomePage(item.path)) || location.pathname === item.path
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <item.icon size={18} />
            <span className="text-xs mt-1.5">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;

