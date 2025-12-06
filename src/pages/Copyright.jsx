import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaArrowLeft } from 'react-icons/fa';

const Copyright = () => {
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

            <h2 style={{ color: isDarkMode ? '#ffffff' : '#333', marginBottom: '30px' }}>Copyright Notice</h2>

            <div style={{
                background: isDarkMode ? '#2a2a2a' : 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: isDarkMode ? '0 2px 8px rgba(255,255,255,0.1)' : '0 2px 8px rgba(0,0,0,0.1)',
                color: isDarkMode ? '#e0e0e0' : '#333',
                lineHeight: '1.6'
            }}>
                <h3>Intellectual Property</h3>
                <p>All content included on this app, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Linza Apps or its content suppliers and protected by international copyright laws.</p>

                <h3>Trademarks</h3>
                <p>Noteify and other marks indicated on our app are trademarks of Linza Apps.</p>

                <h3>Copyright Complaints</h3>
                <p>If you believe that your work has been copied in a way that constitutes copyright infringement, please contact us at linzaapps@gmail.com.</p>

                <p style={{ marginTop: '20px', fontSize: '0.9em', color: isDarkMode ? '#aaa' : '#666' }}>
                    © 2025 Linza Apps. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Copyright;
