import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userLevelAccess, setUserLevelAccess] = useState('');
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email || '');
    }
  }, []);

  const login = (token, email, levelAccess, name, surname) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserLevelAccess(levelAccess);
    setUserName(name);
    setUserSurname(surname);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
    setUserLevelAccess('');
    setUserName('');
    setUserSurname('');
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, userEmail, userName, userSurname, userLevelAccess, login, logout, setIsLoggedIn, setUserName, setUserSurname }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
