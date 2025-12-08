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

            <div style={{
                background: isDarkMode ? '#2a2a2a' : 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: isDarkMode ? '0 2px 8px rgba(255,255,255,0.1)' : '0 2px 8px rgba(0,0,0,0.1)',
                color: isDarkMode ? '#e0e0e0' : '#333',
                lineHeight: '1.6'
            }}>
                <h1>Copyright Notice</h1>
                <p>Last updated: December 8, 2025</p>
                <br></br>
                <p>All content, features, and code within this Notepad application (including but not limited to text, images, source code, design, and layout) are the intellectual property of the developer, unless otherwise stated.</p>

                <h2>1. Ownership</h2>
                <p>All rights are reserved by the original creator. This includes any unique features, styling, and functionality specific to this app.</p>

                <h2>2. Restrictions</h2>
                <ul>
                    <li>You may not copy, reproduce, distribute, or transmit any part of the application without explicit written permission.</li>
                    <li>Reverse engineering or attempting to access or modify the source code without permission is strictly prohibited.</li>
                    <li>The use of this app or any part of it for commercial purposes without proper authorization is not allowed.</li>
                </ul>

                <h2>3. Third-Party Content</h2>
                <p>If any third-party libraries or resources are used, they are subject to their own licenses and are credited appropriately where necessary.</p>

                <h2>4. Legal Action</h2>
                <p>Unauthorized use or duplication of any part of this app may result in legal action under applicable copyright laws.</p>

                <p>
                    While this application is released as open-source on
                    <a href="https://github.com/samirrhashimov/noteify" target="_blank"> GitHub</a>,
                    the name "Noteify", its logo, visual design, and overall structure are the intellectual property of LinzaApps.
                    Any commercial use is strictly prohibited without prior written consent.
                </p>

                Contact Email: <a href="mailto:linzaapps@gmail.com">linzaapps@gmail.com</a>

            </div>
        </div>
    );
};

export default Copyright;
