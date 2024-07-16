import React, { useEffect, useRef } from 'react';
import './css/ChatWindow.css';



const ChatWindow = ({ messages, contact }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    return (
        <div className="chat-window">
            {contact ? (
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
                            <div className="message-text">{message.text}</div>
                            <div className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>
            ) : (
                <div className="placeholder">

                </div>
            )}
        </div>
    );
};

export default ChatWindow;
