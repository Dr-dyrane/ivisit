import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { Home } from 'lucide-react';
import AmbulanceCall from '@/components/ambulance/AmbulanceCall';
import BedBooking from '@/components/bed-booking/BedBooking';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Appointments from '@/pages/Appointments';

export const AppRouter: React.FC = () => {

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/emergency" element={<AmbulanceCall />} />
        <Route path="/book-bed" element={<BedBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>

      {/* Redirect to home if route not found */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

