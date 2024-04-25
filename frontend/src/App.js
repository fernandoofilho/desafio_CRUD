import React from 'react';
import {Route, Routes } from 'react-router-dom';
import HomeAdmin from './pages/HomeAdmin';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login';
import useEmail from './context/EmailContext'
function App() {
  return (
      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App;
