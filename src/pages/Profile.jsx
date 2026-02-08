import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';

const Profile = () => {
    const { currentUser } = useAuth();
    console.log(currentUser)
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    // Fallback date if creationTime is missing
    const joinDate = currentUser?.metadata?.creationTime
        ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
        : 'Unknown';

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
            <button
                onClick={() => navigate('/')}
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
            <FaUserCircle size={100} color={isDarkMode ? '#aaa' : '#555'} style={{ marginBottom: '20px' }} />
            <h2 style={{ color: isDarkMode ? '#ffffff' : '#333' }}>User Profile</h2>
            <div style={{ marginTop: '30px', textAlign: 'left', background: isDarkMode ? '#2a2a2a' : 'white', padding: '20px', borderRadius: '10px', boxShadow: isDarkMode ? '0 2px 5px rgba(255,255,255,0.1)' : '0 2px 5px rgba(0,0,0,0.1)', color: isDarkMode ? '#ffffff' : '#333' }}>
                <p style={{ marginBottom: '2px' }}><strong>Display Name:</strong> {currentUser?.displayName || "user"}</p>
                <p style={{ marginBottom: '2px' }}><strong>Email:</strong> {currentUser?.email}</p>
                <p style={{ marginBottom: '2px' }}><strong>User ID:</strong> {currentUser?.uid}</p>
                <p style={{ marginBottom: '2px' }}><strong>Joined:</strong> {joinDate}</p>
                <div style={{ marginTop: '20px', borderTop: `1px solid ${isDarkMode ? '#444' : '#eee'}`, paddingTop: '20px', textAlign: 'center' }}>
                    <button
                        onClick={() => navigate('/delete-account')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff4d4d',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textDecoration: 'underline',
                            fontWeight: '500'
                        }}
                    >
                        Delete Account & Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
