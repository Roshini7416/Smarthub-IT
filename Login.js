import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation
import './Login.css';

const Login = ({ onLogin }) => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Defined state for password
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (data.success) {
            onLogin(data.user); // This sends the MySQL data (username, bldg, floor) to App.js
            navigate('/dashboard');
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error("Server is not running!", err);
    }
};
    return (
        <div className="login-container">
            <div className="login-card">
                <h2>SmartIT <span>Hub</span></h2>
                <p>Enter your tenant credentials</p>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)} // Added handler
                    />
                    <button type="submit" className="login-btn">Login to Portal</button>
                </form>
                {/* Future-proofing: Link to your Register component */}
                <p className="toggle-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;