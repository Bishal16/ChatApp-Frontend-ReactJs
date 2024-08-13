import React, {useEffect, useState} from 'react';
import ContactList from './ContactList'; // Update import path if necessary
import '../css/sidebar/Sidebar.css' // Ensure you have appropriate styles
import messageIcon from '../../resources/icons/icon-message.png'
import settingsIcon from '../../resources/icons/icon-settings.png'
import groupIcon from '../../resources/icons/icon-group.png'
import profileImage from '../../resources/photos/profile.jpg';
import {getUserById} from "../../api/api";

const Sidebar = ({ contacts, onSelectContact }) => {
    const [activeSection, setActiveSection] = useState('contacts');
    const [imgUrl, setImgUrl] = useState(profileImage); // Default to profileImage

    // Fetch user profile image on component mount or other events
    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const response = await getUserById(localStorage.getItem("userPhoneNumber")); // Replace 'your-username' with actual logic
                const user = response.data;
                console.log(user);
                setImgUrl(user.imageUrl || profileImage); // Use default if image is not available
            } catch (error) {
                console.error('Failed to fetch user image:', error);
                // Optionally set a fallback image or handle the error
            }
        };

        fetchUserImage();
    }, []); // Empty dependency array to run only once on mount

    const handleButtonClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-buttons">
                <button onClick={() => handleButtonClick('contacts')}>
                    <img src={messageIcon} alt="Chats" className="sidebar-button-icon"/>
                </button>
                <button onClick={() => handleButtonClick('settings')}>
                    <img src={settingsIcon} alt="Settings" className="sidebar-button-icon"/>
                </button>
                <button onClick={() => handleButtonClick('profile')}>
                    <img src={imgUrl} alt="Profile" className="sidebar-button-icon"/>
                </button>
                <button onClick={() => handleButtonClick('groups')}>
                    <img src={groupIcon} alt="Groups" className="sidebar-button-icon"/>
                </button>
            </div>
            <div className="sidebar-content">
                {activeSection === 'contacts' && <ContactList contacts={contacts} onSelectContact={onSelectContact}/>}
                {/* Render other sections here based on `activeSection` */}
                {activeSection === 'settings' && <div>Settings Content</div>}
                {activeSection === 'profile' && <div>Profile Content</div>}
                {activeSection === 'groups' && <div>Groups Content</div>}
            </div>
        </div>
    );
};

export default Sidebar;