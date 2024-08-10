// src/components/Signup.js

import React, { useState } from 'react';
import './css/Login.css';
import { createUser } from '../api/api'; // Import your signup API function

const Signup = ({ onSignup }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUser({ phoneNumber, username, firstName, lastName, password });
            onSignup(); // Notify parent component on successful signup
        } catch (err) {
            setError('Error signing up');
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSignup}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
