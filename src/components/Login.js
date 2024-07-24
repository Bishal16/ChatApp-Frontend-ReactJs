import React, { useState } from 'react';
import './css/Login.css';
import { getUserByUsername } from "../api/api";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await getUserByUsername(username);
            const user = response.data;
            console.log(JSON.stringify(user));
            if (user.password === password) {
                onLogin({ username: user.username, id: user.id }); // Pass the user ID along with the username
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Error logging in');
        }
    };

    return (
        <div className="login-container">
            <div className="login-svg">
                <svg
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 0C5.371 0 0 5.371 0 12C0 18.629 5.371 24 12 24C18.629 24 24 18.629 24 12C24 5.371 18.629 0 12 0ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z"
                        fill="#FFFFFFFF"
                    />
                    <path
                        d="M12 6C9.794 6 8 7.794 8 10H10C10 8.897 10.897 8 12 8C13.103 8 14 8.897 14 10C14 11.103 13.103 12 12 12C10.897 12 10 12.897 10 14V15H12V14C12 13.897 12.897 13 14 13C15.103 13 16 12.103 16 11C16 9.794 14.206 8 12 8C10.897 8 10 7.103 10 6H12C12 7.103 12.897 8 14 8C15.103 8 16 7.103 16 6C16 4.897 14.206 4 12 4C10.897 4 10 4.897 10 6H8C8 4.206 9.794 3 12 3C14.206 3 16 4.794 16 7C16 9.206 14.206 11 12 11C9.794 11 8 12.794 8 15H10C10 12.794 11.794 11 14 11C16.206 11 18 9.206 18 7C18 4.794 16.206 3 14 3C11.794 3 10 4.794 10 7C10 7.897 10.897 8 12 8C13.103 8 14 8.897 14 10C14 11.103 13.103 12 12 12C10.897 12 10 12.897 10 14V15C10 16.103 10.897 17 12 17H14V16C14 14.897 13.103 14 12 14C10.897 14 10 13.103 10 12V11H8V14C8 15.103 8.897 16 10 16H12C13.103 16 14 15.103 14 14V13H16V12H12V11Z"
                        fill="#FFFFFFFF"
                    />
                </svg>
            </div>

            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
