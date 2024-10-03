import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext with default values
export const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

// Helper function to parse JWT tokens
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Invalid JWT token', e);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? parseJwt(storedToken) : null;
  });

  // Update user state when token changes
  useEffect(() => {
    if (token) {
      const decodedUser = parseJwt(token);
      setUser(decodedUser);
    } else {
      setUser(null);
    }
  }, [token]);

  // Function to handle login
  const login = (newToken) => {
    setToken(newToken);
    console.log("authcontext login", newToken);
    localStorage.setItem('token', newToken);
  };

  // Function to handle logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };
  console.log("authcontext", token);
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
