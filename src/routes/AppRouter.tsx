import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Emergency from '@/pages/AmbulanceCall';
import BedBooking from '@/pages/BedBooking';
import Profile from '@/pages/Profile';
import Visits from '@/pages/Appointments';
import LegalPage from '@/pages/LegalPage';
import { MarketingLayout } from '@/components/layout/marketing/MarketingLayout';
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';
import { GridBackground } from '@/components/ui/GridBackground';

export const AppRouter: React.FC = () => {
  const location = useLocation();
  const isLegalPage = ['/privacy', '/terms', '/support'].includes(location.pathname);

  return (
    <GridBackground showMask={!isLegalPage}>
      <Routes>
        {/* Public routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<LegalPage title="Privacy Policy" content={<PrivacyContent />} />} />
          <Route path="/terms" element={<LegalPage title="Terms of Service" content={<TermsContent />} />} />
          <Route path="/support" element={<LegalPage title="Support Protocol" content={<SupportContent />} />} />
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
    </GridBackground>
  );
};

const PrivacyContent = () => (
  <>
    <p>iVisit Command (referred to as "we", "us", or "our") operates the iVisit mobile application and platform. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
    <h2>Information Collection and Use</h2>
    <p>We collect several different types of information for various purposes to provide and improve our Service to you, especially in life-critical medical situations.</p>
    <h3>Types of Data Collected</h3>
    <ul>
      <li>Personal Data: Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City.</li>
      <li>Medical Data: Emergency contact info, blood type, and known allergies for rapid medical response.</li>
      <li>Location Data: We use your location to dispatch emergency services with high precision.</li>
    </ul>
  </>
);

const TermsContent = () => (
  <>
    <p>By accessing or using the iVisit Service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the Service.</p>
    <h2>Service Provision</h2>
    <p>iVisit provides a rapid medical dispatch interface. While we strive for maximum uptime and sub-5-minute response times, service availability depends on local conditions and responder capacity.</p>
    <h2>User Responsibility</h2>
    <p>Users are responsible for providing accurate location and medical data. Misuse of the SOS system for non-emergencies may lead to account suspension.</p>
  </>
);

const SupportContent = () => (
  <>
    <p>Our Command Center is available 24/7 to support your medical coordination needs. For immediate assistance during an emergency, please use the SOS feature in the app.</p>
    <h2>Technical Support</h2>
    <p>For technical issues regarding your account or the mobile application, please contact our uplink team.</p>
    <h2>Contact Channels</h2>
    <ul>
      <li>Email: help@ivisit.ng</li>
      <li>International Hotline: +1 951 728 4218</li>
      <li>Status: All Systems Operational</li>
    </ul>
    <h2>Data Privacy & Account Deletion</h2>
    <p>In accordance with Apple and Google Play safety standards, users have the right to request the deletion of their account and all associated personal and medical data. To initiate this process, please send a "DELETION REQUEST" from your registered email address to <strong>privacy@ivisit.ng</strong>. Requests are processed within 72 hours.</p>
  </>
);

