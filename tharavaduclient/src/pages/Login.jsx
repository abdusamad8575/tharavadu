// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Login.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <>
//       <nav className="navbar-login">
//         <div className="navbar-login-container">
//           <a href="/" className="navbar-login-logo">
//             <span className="logo-text">SREEPALATTU</span>
//             <span className="logo-subtext">THARAVADU</span>
//           </a>
//           <div className="navbar-login-message">
//             Secure Login Page
//           </div>
//         </div>
//       </nav>
//       <div className="login-container">
//         <div className="login-box">
//           <h1 className="login-header">Secure Login</h1>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="login-button">Login</button>
//           </form>
//           <div className="login-footer">
//             <p>Don't have an account?</p>
//             <Link to="/register" className="register-link">Register Here</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // For making API requests
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Used for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/auth/login`, { email, password });
      console.log('response',response);
      

      if (response.data.proceed) {
        localStorage.setItem('accessToken', response.data.data.token.accessToken);
        localStorage.setItem('refreshToken', response.data.data.token.refreshToken);
        navigate('/');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
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
          {error && <p className="error-message" style={{textAlign:'center',color:'red',fontSize:'small'}}>{error}</p>}
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
