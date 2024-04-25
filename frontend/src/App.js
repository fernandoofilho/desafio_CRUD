import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomeAdmin from './pages/HomeAdmin';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login';
import { useLogin } from './context/LoginContext';

function App() {
  const { isLoggedIn, userLevelAccess } = useLogin();
  
  const redirectToCorrectPage = () => {
    if (isLoggedIn) {
      if (userLevelAccess === 1) { 
        return <Navigate to="/admin" />;
      } else { 
        return <Navigate to="/home" />;
      }
    } else { 
      return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={redirectToCorrectPage()} />
      <Route path="/home" element={<HomeUser />} />
      <Route path="/admin" element={<HomeAdmin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
