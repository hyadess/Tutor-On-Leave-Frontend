// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await axios.post('http://127.0.0.1:8000/auth/create', {username: user,email: email,password: password},
        {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Signup response:', response);
      login(response.data.access_token,response.data.user_id);
      navigate('/home');
    } catch (error) {
      console.error('Singup failed:', error);
    }
  };

  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label for="username">Username</label>
        <input className="h-[45px] mb-2 p-1" type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" required />
        <label for="email">Email</label>
        <input className="h-[45px] mb-2 p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <label for="password">Password</label>
        <input className="h-[45px] mb-2 p-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;