// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomeAdmin from './pages/HomeAdmin';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userEmail, setUserEmail] = useState('');
  const [userLevelAccess, setUserLevelAccess] = useState(null);

  const checkLogin = async () => {
    const token = localStorage.getItem('token'); 
    const isLoggedIn = !!token; 
    setIsLoggedIn(isLoggedIn);
    setUserEmail(userEmail);
    if (isLoggedIn && userEmail) {
      try {
        const formData = new FormData();
        formData.append('userEmail', userEmail);
        const response = await fetch('http://127.0.0.1:5000/search/user/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, 
        });
        if (response.ok) {
          const data = await response.json();
          const userAccess = JSON.parse(data.data.replace(/'/g, '"')).userLevelAccess;
          setUserLevelAccess(userAccess);
          console.log('ok');
        } else {
          if (response.status === 401) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            return;
          }
          console.error('Erro ao buscar o tipo de usuário');
        }
      } catch (error) {
        console.error('Erro ao buscar o tipo de usuário:', error);
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Routes>
      {userLevelAccess === '1' && (
        <Route exact path="/home" element={<HomeUser />} />
      )}
      {userLevelAccess === '2' && (
        <Route exact path="/home" element={<HomeAdmin />} />
      )}
      <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
      <Route
        path="/*"
        element={
          isLoggedIn ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
