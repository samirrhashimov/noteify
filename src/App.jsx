import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { useAuth } from './contexts/AuthContext';

import ChangePassword from './pages/ChangePassword';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';
import Legal from './pages/Legal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Copyright from './pages/Copyright';
import Licence from './pages/Licence';
import DeleteAccount from './pages/DeleteAccount';

// Placeholder components for now
import Reset from './pages/Reset';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />

      {/* Public legal pages (must be accessible without authentication) */}
      <Route path="/legal" element={<Legal />} />
      <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/legal/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/legal/copyright" element={<Copyright />} />
      <Route path="/legal/licence" element={<Licence />} />
      <Route path="/legal/delete-account" element={<DeleteAccount />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}

export default App;
