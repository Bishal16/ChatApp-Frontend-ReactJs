import React, {useEffect, useRef, useState} from 'react';
import '../css/sidebar/ContactList.css';
import addContactIcon from '../../resources/icons/icon-addContact.png'

const ContactList = ({ contacts, onSelectContact, onLogout }) => {
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
        onLogout(); // Call the parent onLogout function
    };

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
            <div className="sidebar-topper">
                <span className="sidebar-title">Chats</span>
                <div className="sidebar-topper-buttons">
                    <button className="topper-button"><img src={addContactIcon} alt="Groups" className="sidebar-addContact-button-icon"/> </button>

                    <div className="menu-container" ref={menuRef}>
                        <button className="menu-button" onClick={toggleMenu}>
                            &#x22EE;
                        </button>
                        {showMenu && (
                            <div className="menu">
                                <ul>
                                    <li onClick={handleLogout}>Logout</li>
                                    {/*<li>{localStorage.userPhoneNumber}</li>*/}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
            </div>
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