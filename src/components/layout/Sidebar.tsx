import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => (
  <aside className="w-64 bg-gray-800 text-white p-4 hidden md:flex">
    <nav>
      <ul>
        <li><Link to="/dashboard" className="block py-2">Dashboard</Link></li>
        <li><Link to="/profile" className="block py-2">Profile</Link></li>
        <li><Link to="/appointments" className="block py-2">Appointments</Link></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;

