import React, { useState } from 'react';
import './css/MessageInput.css';
import axios from 'axios';
import {sendMessage} from '../api/api'

const MessageInput = ({ onSendMessage, senderPhoneNumber, recipientPhoneNumber }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (message.trim()) {
            const messageData = {
                senderPhoneNumber: senderPhoneNumber,
                recipientPhoneNumber: recipientPhoneNumber,
                content: message,
            }
            try {
                const response = await sendMessage(messageData);

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
