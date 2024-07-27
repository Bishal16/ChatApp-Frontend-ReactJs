import React , { useState } from 'react';
import './css/ContactList.css';

const ContactList = ({ contacts, onSelectContact }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContactId, setSelectedContactId] = useState(null);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectContact = (contact) => {
        setSelectedContactId(contact.id);
        onSelectContact(contact);
    };

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
                    className={`contact-item ${contact.id === selectedContactId ? 'selected' : ''}`}
                    onClick={() => handleSelectContact(contact)}
                >
                    <img src={contact.image} alt={contact.name} className="contact-image"/>
                    <div className="contact-info">
                        <span className="contact-name">{contact.name}</span>
                        <span className="contact-phone">{contact.id}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;