import React, { createContext, useState, useEffect, useContext } from "react";

import api from "../api/axios";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on initial load
  // useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await api.get("/user/details");
      console.log("User fetched:", res.data);

      setUser(res.data);
    } catch (err) {
      setUser(null);
      console.error("User fetch failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // fetchUser();
  // }, []);

  // Logout function
  const logout = async () => {
    try {
      await api.get("/user/logout"); // assume backend clears cookie
      console.log("Logged out successfully");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
