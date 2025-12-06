import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import '../styles/login.css';
import logo from '../assets/img/mainlogo.png';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setMessage('');
    setMessageType('');
    if (!email) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('We have sent a password reset link to your email.');
      setMessageType('success');
    } catch (err) {
      setMessage(err?.message || 'Failed to send reset email.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-body">
      <div id="logo-container">
        <img src={logo} alt="Noteify Logo" id="noteify-logo" />
      </div>

      <div className="login-container">
        <h2>Password Reset</h2>
        {message && (
          <div className={`message ${messageType === 'success' ? 'success' : ''}`}>
            {message}
          </div>
        )}

        <input
          type="email"
          id="resetEmail"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleReset} disabled={loading}>
          {loading ? 'Sending...' : 'Reset Password'}
        </button>

        <p className="separator">or</p>
        <p><Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Reset;
