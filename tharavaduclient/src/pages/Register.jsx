import React, { useState } from 'react';
import './Register.css';  // Ensure this CSS file is created with the styles below

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [subgroup, setSubgroup] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Phone:', phone);
    console.log('Gender:', gender);
    console.log('Age:', age);
    console.log('Subgroup:', subgroup);
    // Perform registration action
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
            Secure Register
          </div>
        </div>
      </nav>
      <div className="register-container">
        <div className="register-box">
          <h2>Create an Account</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john.doe@example.com"
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
                placeholder="********"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="********"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="1"
                placeholder="18"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subgroup">Subgroup</label>
              <select
                id="subgroup"
                value={subgroup}
                onChange={(e) => setSubgroup(e.target.value)}
                required
              >
                <option value="" disabled>Select Subgroup</option>
                <option value="A">Subgroup A</option>
                <option value="B">Subgroup B</option>
                <option value="C">Subgroup C</option>
                <option value="D">Subgroup D</option>
              </select>
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
