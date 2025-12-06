import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/img/mainlogo.png';
import '../styles/login.css';

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
            console.error(err);
            setError('Failed to create an account.');
        }
    };

    return (
        <div className="login-body">
            <div id="logo-container">
                <img src={logo} alt="Noteify Logo" id="noteify-logo" />
            </div>

            <div className="login-container">
                <h2>Register</h2>
                {error && <div className="message">{error}</div>}

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
