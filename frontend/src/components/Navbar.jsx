// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">AI Pipeline</span>
      </div>
      <div className="navbar-right">
        <span className="user">👤 Logged in</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;