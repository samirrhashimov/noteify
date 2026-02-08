import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaArrowLeft, FaTrashAlt, FaExclamationTriangle } from 'react-icons/fa';
import { deleteUser } from 'firebase/auth';

const DeleteAccount = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const { currentUser } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handleDeleteAccount = async () => {
        if (confirmation !== 'DELETE') {
            setError('Please type DELETE to confirm.');
            return;
        }

        if (!currentUser) {
            setError('You must be logged in to delete your account.');
            return;
        }

        setIsDeleting(true);
        setError('');

        try {
            await deleteUser(currentUser);
            // After deletion, the user is logged out automatically by Firebase
            navigate('/login');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/requires-recent-login') {
                setError('For security reasons, you must have logged in recently to delete your account. Please log out and log back in, then try again.');
            } else {
                setError('Failed to delete account. Please try again later or contact support.');
            }
            setIsDeleting(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', marginTop: '80px', padding: '20px', color: isDarkMode ? '#ffffff' : '#333' }}>
            <button
                onClick={() => navigate(-1)}
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
                    margin: '0'
                }}
            >
                <FaArrowLeft />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <FaTrashAlt size={50} color="#ff4d4d" style={{ marginBottom: '20px' }} />
                <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Delete Account & Data</h1>
                <p style={{ color: isDarkMode ? '#aaa' : '#666' }}>Noteify by LinzaApps</p>
            </div>

            <div style={{
                background: isDarkMode ? '#2a2a2a' : '#fff4f4',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #ffcccc',
                marginBottom: '30px'
            }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff4d4d', fontSize: '20px', marginBottom: '15px' }}>
                    <FaExclamationTriangle /> Important Information
                </h2>
                <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                    When you delete your Noteify account, we will permanently remove all your data from our servers. This action is irreversible.
                </p>

                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Data that will be deleted:</h3>
                <ul style={{ paddingLeft: '20px', marginBottom: '20px', lineHeight: '1.6' }}>
                    <li>Your profile information (email, display name).</li>
                    <li>All your notes and saved content.</li>
                    <li>Application settings and preferences.</li>
                </ul>

                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Data Retention:</h3>
                <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                    We do not retain any of your personal data or notes after the account deletion process is complete.
                    However, some anonymized analytical data (which cannot be linked back to you) may be kept to improve our services.
                </p>
            </div>

            <div style={{
                background: isDarkMode ? '#2a2a2a' : 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: isDarkMode ? '0 4px 12px rgba(255,255,255,0.05)' : '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                {currentUser ? (
                    <>
                        <h3 style={{ marginBottom: '20px' }}>Are you sure you want to proceed?</h3>
                        <p style={{ marginBottom: '20px' }}>Type <strong>DELETE</strong> below to confirm.</p>
                        <input
                            type="text"
                            placeholder="Type DELETE"
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                            style={{
                                width: '100%',
                                maxWidth: '300px',
                                padding: '12px',
                                borderRadius: '8px',
                                border: `1px solid ${isDarkMode ? '#444' : '#ccc'}`,
                                background: isDarkMode ? '#1a1a1a' : '#fff',
                                color: isDarkMode ? '#fff' : '#000',
                                marginBottom: '20px',
                                textAlign: 'center',
                                fontSize: '16px'
                            }}
                        />
                        {error && <p style={{ color: '#ff4d4d', marginBottom: '20px' }}>{error}</p>}
                        <button
                            onClick={handleDeleteAccount}
                            disabled={isDeleting || confirmation !== 'DELETE'}
                            style={{
                                width: '100%',
                                maxWidth: '300px',
                                padding: '15px',
                                borderRadius: '8px',
                                border: 'none',
                                background: '#ff4d4d',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: (isDeleting || confirmation !== 'DELETE') ? 'not-allowed' : 'pointer',
                                opacity: (isDeleting || confirmation !== 'DELETE') ? 0.6 : 1,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isDeleting ? 'Deleting...' : 'Permanently Delete My Account'}
                        </button>
                    </>
                ) : (
                    <>
                        <h3 style={{ marginBottom: '20px' }}>Request Account Deletion</h3>
                        <p style={{ marginBottom: '25px', lineHeight: '1.6' }}>
                            To delete your account and all associated data, please follow these steps:
                        </p>
                        <ol style={{ textAlign: 'left', display: 'inline-block', marginBottom: '25px', lineHeight: '1.8' }}>
                            <li>Log in to your Noteify account.</li>
                            <li>Go to your <strong>Profile</strong> page.</li>
                            <li>Click on <strong>Delete Account</strong> at the bottom of the page.</li>
                            <li>Confirm the action by typing "DELETE".</li>
                        </ol>
                        <p style={{ fontSize: '14px', color: isDarkMode ? '#aaa' : '#666' }}>
                            If you cannot access your account, please contact us at <a href="mailto:linzaapps@gmail.com" style={{ color: '#0056b3' }}>linzaapps@gmail.com</a> with your registration email.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default DeleteAccount;
