// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import './index.css'; 
import Users from '../../components/Users';
import Charts from '../../components/Charts';
import Profile from '../../components/Profile';

export default function Home({ isLoggedIn }) {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className='container'>
        <SideBar className='sideBar' onTabClick={handleTabClick} />
        <div className='content'>
          {activeTab === 'profile' && <Profile/>}
          {activeTab === 'home' && <Charts/>}
          {activeTab === 'users' && <Users/>}
        </div>
      </div>
    </>
  );
}
