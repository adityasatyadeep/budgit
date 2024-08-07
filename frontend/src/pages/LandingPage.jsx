// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the Okta login page
    window.location.href = 'http://127.0.0.1:3000/login';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default LandingPage;
