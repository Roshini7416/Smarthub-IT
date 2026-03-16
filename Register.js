import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '', // This will be sent as 'name' to the backend
        email: '',
        password: '',
        building: '',
        floor: '',
        phone: '' // Added this to match your DB schema
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // FIX 1: Change port 3000 to 3001
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // FIX 2: Map 'username' to 'name' so the backend understands it
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                    building: formData.building,
                    floor: formData.floor,
                    phone: formData.phone || "0000000000"
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration Successful!");
                navigate('/'); 
            } else {
                // Show the REAL error from the backend instead of just guessing
                alert("Error: " + (data.message || "Registration failed"));
            }
        } catch (error) {
            console.error("Connection Error:", error);
            alert("Error: Cannot connect to the backend server.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Join <span>SmartIT Hub</span></h2>
                <form onSubmit={handleRegister}>
                    <input name="username" placeholder="Full Name" onChange={handleChange} required />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                    <input name="phone" placeholder="Phone Number" onChange={handleChange} />
                    <div className="form-row">
                        <input name="building" placeholder="Building" onChange={handleChange} required />
                        <input name="floor" placeholder="Floor" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="register-btn">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default Register;