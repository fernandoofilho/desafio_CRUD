import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Users from '../../components/Users';
import Charts from '../../components/Charts';
import Profile from '../../components/Profile';
import ParticlesComponent from '../../components/GeneralBackground';

import './index.css'; 

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login');
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const fetchWithToken = async (url, options) => {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await fetch(url, { ...options, headers });
    return response;
  };

  return (
    <>  

      <div className="home-container">
      <ParticlesComponent className='background' />
      <SideBar onTabClick={handleTabClick} />
      <div className='.container-home'>
        <div className='content'>
          {activeTab === 'profile' && <Profile/>}
          {activeTab === 'home' && <Charts fetchWithToken={fetchWithToken} />}
          {activeTab === 'users' && <Users fetchWithToken={fetchWithToken} />}
        </div>
      </div>
      </div>      
      
    </>
  );
}
