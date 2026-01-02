import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const API_URL = 'http://localhost:8081';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
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
      const response = await axios.post(`${API_URL}/users/login`, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => window.location.href = '/dashboard', 2000);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Login failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sri-Care Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" placeholder="Your username" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" placeholder="Your password" onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}
