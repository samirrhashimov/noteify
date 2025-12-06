import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';

const Legal = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const legalItems = [
        { title: 'Privacy Policy', path: '/privacy-policy', description: 'How we collect and use your data' },
        { title: 'Terms and Conditions', path: '/terms-and-conditions', description: 'Rules for using our service' },
        { title: 'Copyright Notice', path: '/copyright', description: 'Intellectual property information' }
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', marginTop: '80px', padding: '20px' }}>
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

            <h2 style={{ color: isDarkMode ? '#ffffff' : '#333', marginBottom: '30px' }}>Legal Information</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {legalItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        style={{
                            textDecoration: 'none',
                            background: isDarkMode ? '#2a2a2a' : 'white',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: isDarkMode ? '0 2px 8px rgba(255,255,255,0.1)' : '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.3s ease',
                            border: `1px solid ${isDarkMode ? '#3a3a3a' : '#f0f0f0'}`
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(5px)';
                            e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 12px rgba(255,255,255,0.15)' : '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.boxShadow = isDarkMode ? '0 2px 8px rgba(255,255,255,0.1)' : '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div>
                            <h3 style={{
                                margin: '0 0 8px 0',
                                color: isDarkMode ? '#ffffff' : '#333',
                                fontSize: '18px',
                                fontWeight: '600'
                            }}>
                                {item.title}
                            </h3>
                            <p style={{
                                margin: 0,
                                color: isDarkMode ? '#aaa' : '#666',
                                fontSize: '14px'
                            }}>
                                {item.description}
                            </p>
                        </div>
                        <FaChevronRight style={{
                            color: isDarkMode ? '#666' : '#999',
                            fontSize: '16px'
                        }} />
                    </Link>
                ))}
            </div>

            <div style={{
                marginTop: '30px',
                padding: '20px',
                background: isDarkMode ? '#2a2a2a' : 'white',
                borderRadius: '12px',
                boxShadow: isDarkMode ? '0 2px 8px rgba(255,255,255,0.1)' : '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <p style={{
                    margin: '0 0 10px 0',
                    color: isDarkMode ? '#aaa' : '#666',
                    fontSize: '14px'
                }}>
                    © 2025 Linza Apps. All rights reserved.
                </p>
                <p style={{
                    margin: 0,
                    color: isDarkMode ? '#888' : '#999',
                    fontSize: '12px'
                }}>
                    Version 20.2.3
                </p>
            </div>
        </div>
    );
};

export default Legal;
