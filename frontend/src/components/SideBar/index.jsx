import React, { useState } from 'react';
import { useLogin } from '../../context/LoginContext';
import HomeSVG from '../../icons/home.svg';
import ProfileSVG from '../../icons/profile.svg';
import UsersSVG from '../../icons/users.svg';
import LogoutSVG from '../../icons/log-out.svg';

import './index.css';

export default function SideBar({ onTabClick }) {
  const { logout } = useLogin(); // Obtenha a função logout do contexto de login

  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon); 
  };

  const handleSignOut = () => {
    // Chame a função logout ao clicar no botão "sign-out"
    logout();
    // Redirecione para a página de login ou faça qualquer outra ação necessária após o logout
    // Por exemplo, você pode redirecionar o usuário para a página inicial
    onTabClick('home');
  };

  return (
    <div className='container-sidebar'>
      <div className='profile-container'>
        <button className= 'profile-button' onClick={() => onTabClick('profile')}> 
          <img className='profile' src={ProfileSVG} alt="Profile"/>
        </button>
      </div>
      <div className='options-container'>
        <button className= 'option-button' onClick={() => onTabClick('home')}>
          <img className='option' src={HomeSVG} alt="Home"/>
        </button>
        <button className= 'option-button' onClick={() => onTabClick('users')}>
          <img className='option' src={UsersSVG} alt="Users"/> 
        </button>
      </div>
      <div className='sign-out-container'>
        <button className='sign-out-button' onClick={handleSignOut}>
          <img className='sign-out' src={LogoutSVG} alt="Sign Out"/>
        </button>
      </div>
    </div>
  );
}
