// components/account/AccountSidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AccountSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) return null;

  return (
    <aside className="w-60 bg-tertiary text-light p-4 flex flex-col">
      <div>
        <h2 className="text-lg mb-4">My Account</h2>
        <p className="text-sm text-gray-300">
          Hello, {user?.userDetails.name}
        </p>
      </div>

      <nav className="flex flex-col gap-2 mt-4 flex-1">
        <div className="flex-1 flex flex-col gap-2">
          <Link className="btn btn-primary" to="/account">
            Dashboard
          </Link>
          <Link className="btn btn-primary" to="/account/orders">
            Orders
          </Link>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-outline"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};
