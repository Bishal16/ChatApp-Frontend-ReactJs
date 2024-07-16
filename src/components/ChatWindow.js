import React from 'react';
import './css/ChatWindow.css';

const ChatWindow = ({ messages, contact }) => {
    return (
        <div className="chat-window">
            <div className="chat-header">
                {contact ? (
                    <>
                        <img src={contact.image} alt={contact.name} className="header-image" />
                        <span className="header-name">{contact.name}</span>
                    </>
                ) : (
                    <span>Select a contact</span>
                )}
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <strong>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatWindow;