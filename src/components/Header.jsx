import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronRight } from 'react-icons/fa';
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
                        <h2 id="settingsl" style={{ color: '#333' }}>Settings</h2>
                        <button id="close-settings" onClick={toggleSettings} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#333', width: 'auto', flexShrink: 0 }}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="settings-options">
                        <div className="settings-item">
                            <span id="darkModeLabel">Dark mode</span>
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
                    <div className="settings-buttons">
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <button className="settings-button dmsettings">
                                <span className="left">Profile</span><span className="right1"><FaChevronRight /></span>
                            </button>
                        </Link>
                        <Link to="/change-password" style={{ textDecoration: 'none' }}>
                            <button id="change-password" className="settings-button dmsettings">
                                Change password<span className="right2"><FaChevronRight /></span>
                            </button>
                        </Link>
                        <Link to="/feedback" style={{ textDecoration: 'none' }}>
                            <button className="settings-button dmsettings">
                                Send Feedback<span className="right3"><FaChevronRight /></span>
                            </button>
                        </Link>
                        <Link to="/legal" style={{ textDecoration: 'none' }}>
                            <button className="settings-button dmsettings">
                                Legal Info<span className="right4"><FaChevronRight /></span>
                            </button>
                        </Link>
                        <button onClick={handleLogout} className="settings-button danger">Logout</button>
                        <div className="settings-item version">
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
