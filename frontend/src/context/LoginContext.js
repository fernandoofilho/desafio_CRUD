import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userLevelAccess, setUserLevelAccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email || '');
    }
  }, []);

  const login = (token, email, levelAccess) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserLevelAccess(levelAccess);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setUserLevelAccess('');
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, userEmail, userLevelAccess, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
