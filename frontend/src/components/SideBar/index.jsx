import React, { useState } from 'react';
import HomeSVG from '../../icons/home.svg';
import ProfileSVG from '../../icons/profile.svg';
import usersSVG from '../../icons/users.svg';
import LogoutSVG from '../../icons/log-out.svg';

import './index.css';

export default function SideBar({ onTabClick }) {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon); 
  };

  return (
    <div className='container-sidebar'>
        
      <div className='profile-container'>
        <button className= 'profile-button' onClick={() => onTabClick('profile')}> 
            <img className='profile' src={ProfileSVG}/>
        </button>
      </div>
      <div className='options-container'>
        <button className= 'option-button' onClick={() => onTabClick('home')}>
            <img className='option' src={HomeSVG}/>
        </button>
        <button className= 'option-button' onClick={() => onTabClick('users')}>
            <img className='option' src={usersSVG}/> 
        </button>
      </div>
      <div className='sign-out-container'>
        <button className='sign-out-button' onClick={() => onTabClick('sign-out')}>
            <img className='sign-out' src={LogoutSVG}/>
        </button>
      </div>
    </div>
  );
}
