import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const API_URL = 'http://localhost:8081';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${API_URL}/users/register`, formData);
      setMessage(`Registration successful! Welcome ${response.data.username}`);
      setTimeout(() => window.location.href = '/login', 2000);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Registration failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sri-Care Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" placeholder="Choose a username" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" placeholder="your@email.com" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" placeholder="Strong password" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" placeholder="First name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" placeholder="Last name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="tel" name="phoneNumber" placeholder="Your phone number" onChange={handleChange} />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}
