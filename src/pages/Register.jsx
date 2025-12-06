import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/img/mainlogo.png';
import videobg from '../assets/vid/videobg.mp4';
import poster from '../assets/img/404.jpg';
import '../styles/login.css'; // Reusing login styles

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to create an account.');
            console.error(err);
        }
    };

    return (
        <div className="login-body">
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
                <h2>Register</h2>
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
                 <input 
                    type="password" 
                    id="confirm-password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
                
                <p className="separator">or</p>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
