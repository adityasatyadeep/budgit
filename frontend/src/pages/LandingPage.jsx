import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';

const LandingPage = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleLogin = async (e) => {
    // Navigate to the Okta login page
    const publicIP = import.meta.env.VITE_PUBLIC_IP; // Access the environment variable
    console.log("Public IP:", publicIP);
    // window.location.href = `${publicIP}:5000/login`;
    

    const response = axios.post(`${publicIP}:5000/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    
    });

    const data = await response.json();
    if (response.ok) {
      // Save JWT token using AuthContext's login function
      login(data.token);
    } else {
      // Handle error
      console.error(data.message);
    }
  };

  // Perform login request to backend (replace URL with your API endpoint)
  const response = axios.post(`${import.meta.env.VITE_PUBLIC_IP}:5000/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  // If already logged in, redirect to dashboard
  if (token) {
    navigate('/home');
    return null;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default LandingPage;
