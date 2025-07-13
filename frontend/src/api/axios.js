// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://brandify-8mm5.onrender.com/api/brandify", // 🔁 your backend base URL
  // withCredentials: true,           // 🔐 include cookies in all requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
