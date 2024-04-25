import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { EmailProvider } from './context/EmailContext';
import { LoginProvider } from './context/LoginContext';

ReactDOM.render(
  <Router>
    <LoginProvider> 
      <EmailProvider>
        <App />
      </EmailProvider>
    </LoginProvider>
  </Router>,
  document.getElementById('root')
);
