import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import army from '../assets/army.webp'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg('Email and password are required');
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, role, base, email: userEmail } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ role, base, email: userEmail }));

      setMsg('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className='bg-[url(assets/1.jpg)] bg-cover bg-center w-full h-screen flex flex-col justify-center items-center gap-3'>
     <img src= {army} className='w-32 h-32'/>
      <div className="bg-khaki bg-opacity-80 p-6 rounded-lg shadow max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-armygreen">Login</h1>
        {msg && <div className="text-darkbrown mb-2 text-center">{msg}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded bg-khaki active:bg-khaki"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="border p-2 rounded bg-khaki"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button 
            className="bg-armygreen text-sand p-2 rounded transition duration-300 cursor-pointer font-bold text-md"
            type="submit"
          >
            Login
          </button>
          <p className='text-center text-darkbrown font-semibold'>User name & Password</p>
          <p className='text-armygreen'><span className='font-semibold'>admin:</span> admin@military.com/password123</p>
          <p className='text-armygreen'><span className='font-semibold'>commander:</span> cmd1@military.com/password123</p>
          <p className='text-armygreen'><span className='font-semibold'>logistics:</span> log1@military.com/password123</p>
        </form>
      </div>
    </div>
  );
}
