import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AccountSidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    Navigate("/login");
    // Optionally, redirect to login page
  };

//   console.log(user?.email);

  return (
    <aside className="w-60 bg-gray-800 text-white p-4">
      <h2 className="text-lg mb-4">My Account</h2>
      <p>{user?.email}</p>
      <nav>
        <Link to="/account">Dashboard</Link>
        <Link to="/account/orders" className="block mt-2">
          Orders
        </Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </aside>
  );
};
