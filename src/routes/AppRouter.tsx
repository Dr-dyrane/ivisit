import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Emergency from '@/pages/AmbulanceCall';
import BedBooking from '@/pages/BedBooking';
import Profile from '@/pages/Profile';
import Visits from '@/pages/Appointments';
import { MarketingLayout } from '@/components/layout/marketing/MarketingLayout';
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';


export const AppRouter: React.FC = () => {
  return (
      <Routes>
        {/* Public routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Authenticated Routes */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/book-bed" element={<BedBooking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/visits" element={<Visits />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

