import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);
