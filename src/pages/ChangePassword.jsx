import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/dark-mode.css';

const ChangePassword = () => {
    const { currentUser } = useAuth();
    const { isDarkMode } = useTheme();
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
        <>
            <button
                onClick={() => navigate('/profile')}
                style={{
                    position: 'absolute',
                    top: '70px',
                    left: '20px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: isDarkMode ? '#ffffff' : '#0056b3',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '24px',
                    height: '24px',
                    padding: '0',
                    margin: '0',
                    zIndex: 10
                }}
            >
                <FaArrowLeft />
            </button>

            <div style={{
                maxWidth: '450px',
                margin: '100px auto 40px auto',
                padding: '30px',
                backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                borderRadius: '16px',
                boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 1
            }}>
                <h2 style={{
                    margin: '0 0 30px 0',
                    textAlign: 'center',
                    color: isDarkMode ? '#ffffff' : '#333',
                    fontSize: '1.5rem'
                }}>
                    Change Password
                </h2>

                {error && (
                    <div style={{
                        padding: '12px',
                        marginBottom: '20px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        color: '#ff3b30',
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{
                        padding: '12px',
                        marginBottom: '20px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 255, 0, 0.1)',
                        color: '#28a745',
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        style={{
                            padding: '14px 16px',
                            fontSize: '15px',
                            background: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                            color: isDarkMode ? '#ffffff' : '#333',
                            border: `1px solid ${isDarkMode ? '#444' : '#e9ecef'}`,
                            borderRadius: '10px',
                            outline: 'none',
                            width: '100%',
                            boxSizing: 'border-box',
                            transition: 'all 0.2s ease',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0056b3'}
                        onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#444' : '#e9ecef'}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={{
                            padding: '14px 16px',
                            fontSize: '15px',
                            background: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                            color: isDarkMode ? '#ffffff' : '#333',
                            border: `1px solid ${isDarkMode ? '#444' : '#e9ecef'}`,
                            borderRadius: '10px',
                            outline: 'none',
                            width: '100%',
                            boxSizing: 'border-box',
                            transition: 'all 0.2s ease',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0056b3'}
                        onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#444' : '#e9ecef'}
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            padding: '14px 16px',
                            fontSize: '15px',
                            background: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                            color: isDarkMode ? '#ffffff' : '#333',
                            border: `1px solid ${isDarkMode ? '#444' : '#e9ecef'}`,
                            borderRadius: '10px',
                            outline: 'none',
                            width: '100%',
                            boxSizing: 'border-box',
                            transition: 'all 0.2s ease',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#0056b3'}
                        onBlur={(e) => e.target.style.borderColor = isDarkMode ? '#444' : '#e9ecef'}
                    />
                    <button
                        type="submit"
                        style={{
                            marginTop: '10px',
                            backgroundColor: '#0056b3',
                            color: 'white',
                            border: 'none',
                            padding: '16px 20px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#004494'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#0056b3'}
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChangePassword;
