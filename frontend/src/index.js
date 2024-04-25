import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LoginProvider } from './context/LoginContext';

ReactDOM.render(
  <Router>
    <LoginProvider> 
        <App />
    </LoginProvider>
  </Router>,
  document.getElementById('root')
);
