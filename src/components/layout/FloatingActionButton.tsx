import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEmergencyPage = location.pathname === '/emergency';

  const handleClick = () => {
    if (isEmergencyPage) {
      navigate('/book-bed');
    } else {
      navigate('/emergency');
    }
  };

  return (
    <button
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8"
      onClick={handleClick}
    >
      <div className="relative group w-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-600 to-accent-500 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition duration-300"></div>
        <div className="relative w-full px-6 py-3 bg-accent-600 text-white rounded-2xl text-base font-semibold hover:bg-accent-500 transition-colors text-center">
          {isEmergencyPage ? 'Book-Bed' : 'SOS'}
        </div>
      </div>
    </button>
  );
};

export default FloatingActionButton;

