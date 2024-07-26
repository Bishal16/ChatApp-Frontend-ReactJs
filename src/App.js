import React, { useState, useEffect } from 'react';
import './App.css';
import ContactList from './components/ContactList';
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
          image: profileImage,


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



  // const contacts = [
  //   { id: 1, name: 'Alice Johnson', image: profileImage },
  //   { id: 2, name: 'Bob Smith', image: profileImage },
  //   { id: 3, name: 'Charlie Brown', image: profileImage },
  //   { id: 4, name: 'David Wilson', image: profileImage },
  //   { id: 5, name: 'Eva Davis', image: profileImage },
  //   { id: 6, name: 'Frank Miller', image: profileImage },
  //   { id: 7, name: 'Grace Taylor', image: profileImage },
  //   { id: 8, name: 'Hannah Anderson', image: profileImage },
  //   { id: 9, name: 'Isaac Thomas', image: profileImage },
  //   { id: 10, name: 'Jack Jackson', image: profileImage },
  //   { id: 11, name: 'Kathy White', image: profileImage },
  //   { id: 12, name: 'Liam Harris', image: profileImage },
  //   { id: 13, name: 'Mia Martin', image: profileImage },
  //   { id: 14, name: 'Noah Thompson', image: profileImage },
  //   { id: 15, name: 'Olivia Garcia', image: profileImage },
  //   { id: 16, name: 'Paul Martinez', image: profileImage },
  //   { id: 17, name: 'Quinn Robinson', image: profileImage },
  //   { id: 18, name: 'Ryan Clark', image: profileImage },
  //   { id: 19, name: 'Sophie Lewis', image: profileImage },
  //   { id: 20, name: 'Tina Smith', image: profileImage }
  // ];


// i want to populate the contacts here from my api

  // const [messages, setMessages] =
  //     useState(
  //         {
  //                   1: [
  //                     { sender: 'Alice Johnson', text: 'Hi there!', timestamp: Date.now() - 600000 },
  //                     { sender: 'You', text: 'Hello, Alice!', timestamp: Date.now() - 550000 },
  //                     { sender: 'Alice Johnson', text: 'How are you?', timestamp: Date.now() - 500000 },
  //                     { sender: 'You', text: 'I am good, thanks! How about you?', timestamp: Date.now() - 450000 },
  //                     { sender: 'Alice Johnson', text: 'I am doing well. Thanks for asking!', timestamp: Date.now() - 400000 },
  //
  //                   ],
  //   // Add other contacts with their own message histories...
  // });

  // const [messages, setMessages] = useState({});
  // const [selectedContact, setSelectedContact] = useState(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);


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
    localStorage.setItem('userPhoneNumber',user.phoneNumber)
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
        <div className="sidebar">
          <ContactList contacts={contacts} onSelectContact={handleSelectContact} />
        </div>

        <div className={`main ${selectedContact ? 'with-contact' : 'no-contact'}`}>
          {selectedContact ? (
              <>
                <ChatHeader contact={selectedContact} onLogout={handleLogout} />
                <ChatWindow messages={messages} contact={selectedContact} />
                <MessageInput
                    onSendMessage={handleSendMessage}
                    senderPhoneNumber={localStorage.getItem("userPhoneNumber")} // Replace with actual sender ID if needed
                    recipientPhoneNumber={selectedContact.id}
                />
              </>
          ) : (
              <div><Placeholder /></div>
          )}
        </div>
      </div>
  );
};
export default App;
