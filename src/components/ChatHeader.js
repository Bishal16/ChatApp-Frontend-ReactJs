import React from 'react';
import './css/ChatHeader.css';

const ChatHeader = ({ contact }) => {
    return (
        <div className="chat-header">
            <h2>{contact ? contact.name : 'Select a contact'}</h2>
            {contact && <span className="status">Active</span>}
        </div>
    );
};

export default ChatHeader;
