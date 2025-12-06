import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/img/mainlogo.png'; // Make sure this file exists or update path
import videobg from '../assets/vid/videobg.mp4';
import poster from '../assets/img/404.jpg';
import '../styles/login.css'; // Ensure this path is correct relative to src/pages

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error(err);
        }
    };

    return (
        <div className="login-body"> {/* Added a wrapper class if needed or use styles directly */}
            <div id="logo-container">
                <img src={logo} alt="Noteify Logo" id="noteify-logo" />
            </div>

            <div className="video-bg">
                <video autoPlay loop muted poster={poster}>
                    <source src={videobg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="login-container">
                <h2>Login</h2>
                {error && <div className="message" style={{ color: 'red' }}>{error}</div>}
                <div id="message" className="message"></div>
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>

                <p className="separator">or</p>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <p><Link to="/reset">Forgot your password?</Link></p>
            </div>
        </div>
    );
};

export default Login;
