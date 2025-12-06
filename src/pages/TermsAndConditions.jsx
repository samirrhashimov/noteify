import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaArrowLeft } from 'react-icons/fa';

const TermsAndConditions = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', marginTop: '80px', padding: '20px' }}>
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
                    width: 'auto',
                    height: 'auto',
                    padding: '8px'
                }}
            >
                <FaArrowLeft />
            </button>

            <h2 style={{ color: isDarkMode ? '#ffffff' : '#333', marginBottom: '30px' }}>Terms and Conditions</h2>

            <div style={{
                background: isDarkMode ? '#2a2a2a' : 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: isDarkMode ? '0 2px 8px rgba(255,255,255,0.1)' : '0 2px 8px rgba(0,0,0,0.1)',
                color: isDarkMode ? '#e0e0e0' : '#333',
                lineHeight: '1.6'
            }}>
                <h3>1. Introduction</h3>
                <p>Welcome to Noteify. By using our app, you agree to these terms.</p>

                <h3>2. Usage</h3>
                <p>You agree to use Noteify only for lawful purposes and in a way that does not infringe the rights of others.</p>

                <h3>3. Accounts</h3>
                <p>You are responsible for maintaining the security of your account and password.</p>

                <h3>4. Content</h3>
                <p>You retain ownership of any content you create, but you grant us a license to store and display it as necessary for the service.</p>

                <h3>5. Disclaimer</h3>
                <p>Noteify is provided "as is" without any warranties.</p>
            </div>
        </div>
    );
};

export default TermsAndConditions;
