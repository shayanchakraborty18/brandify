// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://brandify-8mm5.onrender.com/api/brandify',
  // baseURL: 'http://localhost:3000/api/brandify',
  withCredentials: true, // important for sending cookies
});

export default api;
