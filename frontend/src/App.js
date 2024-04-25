// App.js
import React, {useEffect} from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import HomeAdmin from './pages/HomeAdmin';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login';
import { useLogin } from './context/LoginContext';

function App() {
  const { isLoggedIn, setIsLoggedIn, userLevelAccess } = useLogin();

  const renderProtectedRoute = (element, requiredLevelAccess) => {
    if (!isLoggedIn || (requiredLevelAccess && userLevelAccess !== requiredLevelAccess)) {

      return <Navigate to="/login" />;
    }
    return element;
  };
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/home"
        element={renderProtectedRoute(<HomeUser />, 1)}
      />
      <Route
        path="/admin"
        element={renderProtectedRoute(<HomeAdmin />, 2)}
      />
      <Route
        path="/"
        element={<Login />}
      />
      <Route
        path="/login"
        element={<Login />} />

    </Routes>
  );
}

export default App;
