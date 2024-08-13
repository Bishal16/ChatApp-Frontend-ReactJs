import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import ContactList from './components/sidebar/ContactList';
import ChatWindow from './components/ChatWindow';
import Placeholder from "./components/Placeholder-chatWindow";
import MessageInput from './components/MessageInput';
import ChatHeader from './components/ChatHeader';
import Login from './components/Login';
import profileImage from './resources/photos/profile.jpg';
import {getAllContact, getMessages} from './api/api'


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAllContact(localStorage.getItem("userPhoneNumber"));
        const contactData = response.data.map(entry => ({
          id: entry.contact.phoneNumber,
          name: entry.contact.firstName + " " + entry.contact.lastName,
          image: entry.contact.imageUrl || profileImage,
        }));
        setContacts(contactData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSelectContact = async (contact) => {
    setSelectedContact(contact);
    try {
      const response = await getMessages(localStorage.getItem("userPhoneNumber"), contact.id);
      const formattedMessages = response.data.map(msg => ({
        sender: msg.sender.phoneNumber === localStorage.getItem("userPhoneNumber") ? 'You' : msg.sender.firstName,
        text: msg.content,
        timestamp: msg.timestamp,
      }));
      setMessages(prevMessages => ({
        ...prevMessages,
        [contact.id]: formattedMessages,
      }));
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSendMessage = (messageText) => {
    if (selectedContact) {
      const newMessage = {
        sender: 'You',
        text: messageText,
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => {
        const contactMessages = prevMessages[selectedContact.id] || [];
        return {
          ...prevMessages,
          [selectedContact.id]: [...contactMessages, newMessage],
        };
      });
    }
  };

  const handleLogin = (user) => {
    console.log(user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userPhoneNumber', user.phoneNumber);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedContact(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
      <div className="app">
        {/*<div className="sidebar">*/}
        {/*  <ContactList contacts={contacts} onSelectContact={handleSelectContact}/>*/}
        {/*</div>*/}
        <Sidebar contacts={contacts} onSelectContact={handleSelectContact}/>
        <div className={`main ${selectedContact ? 'with-contact' : 'no-contact'}`}>
          {selectedContact ? (
              <>
                <ChatHeader contact={selectedContact} onLogout={handleLogout}/>
                <ChatWindow messages={messages} contact={selectedContact}/>
                <MessageInput
                    onSendMessage={handleSendMessage}
                    senderPhoneNumber={localStorage.getItem("userPhoneNumber")}
                    recipientPhoneNumber={selectedContact.id}
                />
              </>
          ) : (
              <div><Placeholder/></div>
          )}
        </div>
      </div>
  );
};

export default App;
