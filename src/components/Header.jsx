import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronRight, FaUser, FaKey, FaCommentDots, FaFileContract, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { auth } from '../lib/firebase';
import logo from '../assets/img/mainlogo2.png';

const Header = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { currentUser } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <header>
            <button id="menu-btn" onClick={toggleSettings}><FaBars /></button>
            <Link to="/">
                <img src={logo} alt="Noteify" height="40" width="75" style={{ position: 'relative', top: '2px', right: '5px' }} />
            </Link>

            <div id="settings-panel" className="settings-panel" style={{ display: settingsOpen ? 'flex' : 'none' }}>
                <div className="settings-content">
                    <div className="settings-header">
                        <h2 id="settingsl">Settings</h2>
                        <button id="close-settings" onClick={toggleSettings}>
                            <FaTimes />
                        </button>
                    </div>

                    {/* Dark Mode Toggle */}
                    <div className="settings-section">
                        <div className="settings-item theme-toggle">
                            <div className="item-left">
                                {isDarkMode ? <FaMoon className="item-icon" /> : <FaSun className="item-icon" />}
                                <span>Dark Mode</span>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id="theme-toggle"
                                    checked={isDarkMode}
                                    onChange={toggleTheme}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="settings-section">
                        <Link to="/profile" className="settings-link">
                            <div className="settings-menu-item">
                                <div className="item-left">
                                    <FaUser className="item-icon" />
                                    <span>Profile</span>
                                </div>
                                <FaChevronRight className="chevron-icon" />
                            </div>
                        </Link>

                        <Link to="/change-password" className="settings-link">
                            <div className="settings-menu-item">
                                <div className="item-left">
                                    <FaKey className="item-icon" />
                                    <span>Change Password</span>
                                </div>
                                <FaChevronRight className="chevron-icon" />
                            </div>
                        </Link>

                        <Link to="/feedback" className="settings-link">
                            <div className="settings-menu-item">
                                <div className="item-left">
                                    <FaCommentDots className="item-icon" />
                                    <span>Send Feedback</span>
                                </div>
                                <FaChevronRight className="chevron-icon" />
                            </div>
                        </Link>

                        <Link to="/legal" className="settings-link">
                            <div className="settings-menu-item">
                                <div className="item-left">
                                    <FaFileContract className="item-icon" />
                                    <span>Legal Info</span>
                                </div>
                                <FaChevronRight className="chevron-icon" />
                            </div>
                        </Link>
                    </div>

                    {/* Logout Button */}
                    <div className="settings-section">
                        <button onClick={handleLogout} className="settings-logout-btn">
                            <FaSignOutAlt className="item-icon" />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Version Info */}
                    <div className="settings-footer">
                        <div className="version-info">
                            <span>App Version: v20.2.3</span>
                        </div>

                        <div id="dev-info-box">
                            <p>
                                <strong id="appname">Noteify </strong><strong>by</strong> <strong id="company">linzaapps</strong>
                            </p>
                            <p>
                                <strong>Contact: </strong>
                                <a href="mailto:linzaapps@gmail.com">linzaapps@gmail.com</a>
                            </p>
                            <p>
                                <strong>GitHub:</strong>
                                <a id="github-link" href="https://github.com/samirrhashimov/noteify" target="_blank" rel="noopener noreferrer">
                                    github.com/samirrhashimov/noteify
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
