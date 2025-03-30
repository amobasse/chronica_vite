import { useState } from "react";
import { useAuth } from "../App.tsx";
import { User } from "../types/User";

const Dashboard = () => {
  const { user, setUser, showLogin, setShowLogin } = useAuth();

  const handleLogout = () => {
    setUser(null);
    setShowLogin(false);
  }

  return (
    <div className="dashboard">
        <header className="dashboard-header">
            <h1>Welcome to the dashboard, {user?.username}.</h1>
            <button
                onClick={handleLogout}
                className="logout-button"
            >Logout</button>
        </header>
            
        <div className="user-info">
            <h2>Your Profile</h2>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
        </div>

        <div className="dashboard-content">
            <h2>Dashboard Content</h2>
            <p>This is where future content will go.</p>
        </div>
    </div>
  );
};

export default Dashboard;
