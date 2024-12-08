import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import Emergency from '@/pages/AmbulanceCall';
import BedBooking from '@/pages/BedBooking';
import Profile from '@/pages/Profile';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/emergency" element={<PrivateRoute element={<Emergency />} />} />
        <Route path="/book-bed" element={<PrivateRoute element={<BedBooking />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Route>
    </Routes>
  );
};

