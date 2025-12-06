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

// Placeholder components for now
const Reset = () => <div>Reset Password Page</div>;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="legal" element={<Legal />} />
      </Route>
    </Routes>
  );
}

export default App;
