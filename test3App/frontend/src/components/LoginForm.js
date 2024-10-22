import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.js.css';

function LoginForm() {
  const [activeTab, setActiveTab] = useState('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/${activeTab}`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 201 || response.status === 200) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-form-container">
      <header className="login-form-header">
        <h1>User Registration and Secure Login</h1>
      </header>
      <div className="navigation-tabs">
        <button 
          className={`tab-button ${activeTab === 'register' ? 'active' : ''}`} 
          onClick={() => handleTabSwitch('register')}
        >
          Register
        </button>
        <button 
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`} 
          onClick={() => handleTabSwitch('login')}
        >
          Login
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form-fields">
        <input 
          type="email" 
          placeholder={activeTab === 'register' ? 'Email' : 'Registered Email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="primary-action-button">
          {activeTab === 'register' ? 'Register' : 'Login'}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="additional-links">
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/terms-and-conditions">Terms and Conditions</a>
      </div>
      <footer className="login-form-footer">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginForm;
