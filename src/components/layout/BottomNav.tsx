import React from 'react';
import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 md:hidden">
    <ul className="flex justify-around">
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/appointments">Appointments</Link></li>
    </ul>
  </nav>
);

export default BottomNav;

