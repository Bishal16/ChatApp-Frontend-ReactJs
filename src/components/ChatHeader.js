import React, { useState, useRef, useEffect } from 'react';
import './css/ChatHeader.css';

const ChatHeader = ({ contact, onLogout }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('userPhoneNumber', 'null');
        onLogout();
    };

    return (
        <div className="chat-header">
            <img src={contact.image} alt="Profile" className="header-image" />
            <div className="header-details">
                <div className="header-name">{contact.name}</div>
                <span className="status">Active</span>
            </div>
            <div className="menu-container" ref={menuRef}>
                <button className="menu-button" onClick={toggleMenu}>
                    &#x22EE;
                </button>
                {showMenu && (
                    <div className="menu">
                        <ul>
                            <li onClick={handleLogout}>Logout</li>
                            <li >{localStorage.userPhoneNumber}</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
