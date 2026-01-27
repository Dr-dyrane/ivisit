import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Emergency from '@/pages/AmbulanceCall';
import BedBooking from '@/pages/BedBooking';
import Profile from '@/pages/Profile';
import Visits from '@/pages/Appointments';
import LegalPage from '@/pages/LegalPage';
import EarlyAccessPage from '@/pages/EarlyAccessPage';
import SitemapViewer from '@/components/seo/SitemapViewer';
import { MarketingLayout } from '@/components/layout/marketing/MarketingLayout';
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';
import { GridBackground } from '@/components/ui/GridBackground';

export const AppRouter: React.FC = () => {
  const location = useLocation();
  const isLegalPage = ['/privacy', '/terms', '/support', '/medical-disclaimer', '/health-data-consent'].includes(location.pathname);

  return (
    <GridBackground showMask={!isLegalPage}>
      <Routes>
        {/* Public routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/early-access" element={<EarlyAccessPage />} />
          <Route path="/sitemap" element={<SitemapViewer />} />
          <Route path="/privacy" element={<LegalPage title="Privacy Policy" content={<PrivacyContent />} />} />
          <Route path="/terms" element={<LegalPage title="Terms of Service" content={<TermsContent />} />} />
          <Route path="/support" element={<LegalPage title="Support Protocol" content={<SupportContent />} />} />
          <Route path="/medical-disclaimer" element={<LegalPage title="Medical Disclaimer" content={<MedicalDisclaimerContent />} />} />
          <Route path="/health-data-consent" element={<LegalPage title="Health Data Consent" content={<HealthDataConsentContent />} />} />
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
      <li>Admin/Management: <a href="mailto:admin@ivisit.ng" className="text-primary hover:underline transition-all">admin@ivisit.ng</a></li>
      <li>All user replies go here: <a href="mailto:support@ivisit.ng" className="text-primary hover:underline transition-all">support@ivisit.ng</a></li>
      <li>Help desk: <a href="mailto:help@ivisit.ng" className="text-primary hover:underline transition-all">help@ivisit.ng</a></li>
      <li>International Hotline: +1 951 728 4218</li>
      <li>Status: All Systems Operational</li>
    </ul>
    <h2>Data Privacy & Account Deletion</h2>
    <p>In accordance with Apple and Google Play safety standards, users have the right to delete their account and all associated personal and medical data directly within the application settings. This process is instant and irreversible. For any privacy-related inquiries, you may contact our Privacy-related communication team: <a href="mailto:privacy@ivisit.ng" className="text-primary hover:underline transition-all">privacy@ivisit.ng</a>.</p>
  </>
);

const MedicalDisclaimerContent = () => (
  <>
    <p><strong>⚠️ IMPORTANT MEDICAL DISCLAIMER</strong></p>
    <p>iVisit is a mobile application designed to connect users with healthcare providers and emergency medical services. This application is NOT a substitute for professional medical care, emergency services, or medical advice.</p>

    <h2>Emergency Services</h2>
    <p>For life-threatening emergencies, call 911 or your local emergency number immediately. Do not rely on the iVisit app as your primary means of requesting emergency assistance.</p>

    <h2>Medical Information</h2>
    <p>The medical information provided through iVisit is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>

    <h2>No Warranty</h2>
    <p>We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the app or the information, products, services, or related graphics contained in the app for any purpose.</p>

    <h2>Limitation of Liability</h2>
    <p>In no event shall iVisit Command, its directors, employees, partners, or affiliates be liable for any claim, damages, or other liability, including without limitation any indirect or consequential loss, damage, or injury arising out of or in connection with the use of this app.</p>

    <h2>Response Times</h2>
    <p>While we strive to facilitate rapid connections with healthcare providers, we cannot guarantee response times. Actual response times depend on various factors including provider availability, geographic location, and network conditions.</p>

    <p><strong>By using iVisit, you acknowledge that you have read, understood, and agree to this Medical Disclaimer.</strong></p>
  </>
);

const HealthDataConsentContent = () => (
  <>
    <p><strong>🛡️ HEALTH DATA CONSENT</strong></p>
    <p>iVisit requires your explicit consent to collect, store, and process your health information to provide you with optimal healthcare services.</p>

    <h2>What Health Data We Collect</h2>
    <ul>
      <li><strong>Emergency Contact Information:</strong> Names and phone numbers of designated emergency contacts</li>
      <li><strong>Medical Profile:</strong> Blood type, allergies, current medications, chronic conditions, past surgeries</li>
      <li><strong>Location Data:</strong> Real-time and historical location information for emergency dispatch</li>
      <li><strong>Usage Data:</strong> App interactions, service requests, and communication with healthcare providers</li>
    </ul>

    <h2>How We Use Your Health Data</h2>
    <ul>
      <li><strong>Emergency Response:</strong> Dispatch appropriate medical services to your location</li>
      <li><strong>Healthcare Coordination:</strong> Share relevant medical information with authorized healthcare providers</li>
      <li><strong>Service Improvement:</strong> Analyze usage patterns to enhance our emergency response capabilities</li>
      <li><strong>Communication:</strong> Send critical updates about your medical requests and appointments</li>
    </ul>

    <h2>Data Security & Protection</h2>
    <p>Your health data is protected using industry-standard encryption and security measures. We implement:</p>
    <ul>
      <li>End-to-end encryption for all data transmission</li>
      <li>Secure storage with limited access controls</li>
      <li>Regular security audits and vulnerability assessments</li>
      <li>Compliance with healthcare data protection standards</li>
    </ul>

    <h2>Your Rights</h2>
    <p>You have the right to:</p>
    <ul>
      <li><strong>Access:</strong> Request a copy of your health data</li>
      <li><strong>Correct:</strong> Update inaccurate or incomplete information</li>
      <li><strong>Delete:</strong> Request removal of your health data (with reasonable notice)</li>
      <li><strong>Withdraw Consent:</strong> Stop future data collection and processing</li>
    </ul>

    <h2>Data Sharing</h2>
    <p>We only share your health data with:</p>
    <ul>
      <li>Authorized healthcare providers directly involved in your care</li>
      <li>Emergency medical services during active emergencies</li>
      <li>Legal authorities when required by law or court order</li>
    </ul>

    <h2>Consent Duration</h2>
    <p>Your consent remains in effect until you withdraw it. You may withdraw consent at any time through your account settings or by contacting our privacy team.</p>

    <p><strong>By providing your consent, you authorize iVisit to process your health data as described above for the purpose of providing you with emergency medical services and healthcare coordination.</strong></p>

    <h2>Questions or Concerns?</h2>
    <p>If you have questions about this consent or how we handle your health data, please contact our Privacy-related communication team at <a href="mailto:privacy@ivisit.ng" className="text-primary hover:underline transition-all">privacy@ivisit.ng</a>.</p>
  </>
);

