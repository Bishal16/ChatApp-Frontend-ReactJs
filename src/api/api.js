// src/api.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Backend base URL
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

// User APIs
export const createUser = (userData) => apiClient.post('/users', userData);
export const getUserById = (id) => apiClient.get(`/users/${id}`);
export const getUserByUsername = (username) => apiClient.get(`/users/username/${username}`);
// export const getUserProfilePhoto = () => apiClient.get(`/uploads/profile_photo/');

// Contact APIs
export const addContact = (contactData) => apiClient.post('/contacts', contactData);
export  const getAllContact = (userPhoneNumber) => apiClient.get(`/contacts/${userPhoneNumber}`);

// Message APIs
export const sendMessage = (messageData) => apiClient.post('/messages', messageData);
export const getMessages = (senderPhoneNumber, recipientPhoneNumber) => apiClient.get(`/messages/${senderPhoneNumber}/${recipientPhoneNumber}`);

export default apiClient;
