import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/dark-mode.css'; // Assuming styles are global or partly here

const ChangePassword = () => {
    const { currentUser } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            return setError("New passwords do not match");
        }

        try {
            // Re-authenticate user
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credential);

            await updatePassword(currentUser, newPassword);
            setMessage("Password updated successfully");
            setTimeout(() => navigate('/profile'), 2000);
        } catch (err) {
            console.error(err);
            setError("Failed to update password. Check your current password.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto' }}>
            <h2>Change Password</h2>
            {error && <div className="message error-message" style={{ display: 'block', color: 'red' }}>{error}</div>}
            {message && <div className="message success-message" style={{ display: 'block', color: 'green' }}>{message}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" className="settings-button" style={{ backgroundColor: '#0056b3', color: 'white', justifyContent: 'center' }}>
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
