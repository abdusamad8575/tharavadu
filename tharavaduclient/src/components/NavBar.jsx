import React, { useState } from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    // navigate('/login')
    navigate('/register')
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <span className="logo-text">SREEPALATTU </span>
          <span className="logo-subtext">THARAVADU</span>
        </a>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to={'/'} className="navbar-item">Home</Link>
          <Link to={"/about"} className="navbar-item">About</Link>
          <Link to={"/gallery"} className="navbar-item">Gallery</Link>
          <Link to={"/events"} className="navbar-item">Events</Link>
          <Link to={"/contact"} className="navbar-item">Contact</Link>
          {isLoggedIn ? (
            <button onClick={handleLoginLogout} className="navbar-button">Logout</button>
          ) : (
            <button onClick={handleLoginLogout} className=" navbar-button">Login</button>
          )}
        </div>
        <div className={`navbar-burger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
