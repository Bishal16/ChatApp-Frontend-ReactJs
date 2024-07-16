import React , { useState } from 'react';
import './css/ContactList.css';

const ContactList = ({ contacts, onSelectContact }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="contact-list">
            <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            {filteredContacts.map(contact => (
                <div
                    key={contact.id}
                    className="contact-item"
                    onClick={() => onSelectContact(contact)}
                >
                    <img src={contact.image} alt={contact.name} className="contact-image" />
                    <span>{contact.name}</span>
                </div>
            ))}
        </div>
    );
};

export default ContactList;