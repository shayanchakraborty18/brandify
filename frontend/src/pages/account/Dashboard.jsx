// pages/account/Dashboard.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-4 text-gray-500">Loading account...</div>;
  }

  if (!user) {
    return <div className="p-4 text-red-500">You are not logged in.</div>;
  }
console.log(user);
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.userDetails.name || user.userDetails.email}</h1>
      <p className="text-gray-600 mb-6">
        Here’s an overview of your account details.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <p><strong>Name:</strong> {user.userDetails.name || "N/A"}</p>
          <p><strong>Email:</strong> {user.userDetails.email}</p>
        </div>

        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Orders</h2>
          <p>You have 0 orders (demo content).</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
