import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <nav className="navbar-login">
        <div className="navbar-login-container">
          <a href="/" className="navbar-login-logo">
            <span className="logo-text">SREEPALATTU</span>
            <span className="logo-subtext">THARAVADU</span>
          </a>
          <div className="navbar-login-message">
            Secure Login Page
          </div>
        </div>
      </nav>
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-header">Secure Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="login-footer">
            <p>Don't have an account?</p>
            <Link to="/register" className="register-link">Register Here</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
