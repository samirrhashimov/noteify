import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/img/mainlogo.png';
import '../styles/login.css';

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
            console.error(err);
            setError('Failed to login. Please check your credentials.');
        }
    };

    return (
        <div className="login-body">
            <div id="logo-container">
                <img src={logo} alt="Noteify Logo" id="noteify-logo" />
            </div>

            <div className="login-container">
                <h2>Login</h2>
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
                <button onClick={handleLogin}>Login</button>

                <p className="separator">or</p>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <p><Link to="/reset">Forgot your password?</Link></p>
            </div>
        </div>
    );
};

export default Login;
