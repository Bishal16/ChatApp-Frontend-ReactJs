import React, { useState } from 'react';
import './css/MessageInput.css';
import axios from 'axios';

const MessageInput = ({ onSendMessage, senderId, recipientId }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                const response = await axios.post('http://localhost:8080/messages', {
                    content: message,
                    senderId: senderId,
                    recipientId: recipientId
                });
                onSendMessage(message);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="message-input">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default MessageInput;
