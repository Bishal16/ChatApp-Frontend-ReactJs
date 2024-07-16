import React from 'react';
import './css/ChatWindow.css';

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window">
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
