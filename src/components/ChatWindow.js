import React, { useEffect, useRef } from 'react';
import './css/ChatWindow.css';

const ChatWindow = ({ messages, contact }) => {
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-window">
            {messages[contact.id]?.map((message, index) => (
                <div
                    key={index}
                    className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}
                >
                    {/*<div className="message-sender">{message.sender}</div>*/}
                    <div className="message-text">{message.text}</div>
                    <div className="message-timestamp">
                        {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    );
};

export default ChatWindow;
