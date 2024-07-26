// src/api.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// User APIs
export const createUser = (userData) => apiClient.post('/users', userData);
export const getUserById = (id) => apiClient.get(`/users/${id}`);
export const getUserByUsername = (username) => apiClient.get(`/users/username/${username}`);

// Contact APIs
export const addContact = (contactData) => apiClient.post('/contacts', contactData);
export  const getAllContact = () => apiClient.get('/contacts');

// Message APIs
export const sendMessage = (messageData) => apiClient.post('/messages', messageData);
export const getMessages = (senderId, recipientId) => apiClient.get(`/messages/${senderId}/${recipientId}`);

export default apiClient;
