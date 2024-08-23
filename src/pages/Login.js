// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post('http://127.0.0.1:8000/auth/login', { username:email, password:password },
        {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Login response:', response);
      login(response.data.access_token,response.data.user_id);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    
      <div class="login-container">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <label for="email">Username</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label for="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div class="checkbox-container">
          <input type="checkbox" id="remember-me" />
          <label for="remember-me">Remember Me</label>
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>

    
      
  );
  
};

export default Login;