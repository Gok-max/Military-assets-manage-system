import React, { useEffect, useState } from 'react';
import api from '../services/api';
import profile from '../assets/profile.jpg'
import base from '../assets/base.png'

export default function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await api.get('/profile');
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setMsg('Failed to load profile. Please log in again.');
    }
  }

  if (msg) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold">Profile</h1>
        <p className="text-red-500">{msg}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold">Profile</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto bg-darkbrown h-screen">
      <h1 className="text-3xl font-bold mb-4 text-sand">Profile</h1>
      <div className='flex justify-center'>
      <div>
        <img src={profile} className='w-96 h-96'/>
      </div>
      <div className="bg-khaki p-4 rounded shadow w-96 text-armygreen text-xl">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Base:</strong> {user.base}</p>
        <img src={base} className='w-60 h-60 self-center'/>
      </div>
      </div>
      
    </div>
  );
}
