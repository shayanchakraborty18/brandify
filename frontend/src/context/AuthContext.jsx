// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import api from "../api/axios";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch user details from backend
   * Wrapped in useCallback so it's stable between renders
   */
  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/user/details");
      setUser(res.data);
    } catch (err) {
      setUser(null);
      console.error("User fetch failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Auto-fetch user on initial load if token exists
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  /**
   * Logout
   */
  const logout = async () => {
    try {
      await api.get("/user/logout"); // Optional if backend clears cookie/session
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
