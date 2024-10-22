import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleTabSwitch = () => {
    setIsRegister(!isRegister);
    setMessage('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    try {
      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage(response.data.message);
      if (!isRegister) {
        // Redirect to dashboard or another page after a successful login
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="register-login-container">
      <h1>User Registration and Secure Login</h1>
      <div className="nav-tabs">
        <button onClick={handleTabSwitch} className={isRegister ? 'active' : ''}>
          Register
        </button>
        <button onClick={handleTabSwitch} className={!isRegister ? 'active' : ''}>
          Login
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder={isRegister ? 'Email' : 'Registered Email'}
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="primary-action-button">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      {message && <div className="response-message">{message}</div>}
      <div className="additional-links">
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/terms-and-conditions">Terms and Conditions</a>
      </div>
      <footer>
        <p>© 2023 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default RegisterForm;
