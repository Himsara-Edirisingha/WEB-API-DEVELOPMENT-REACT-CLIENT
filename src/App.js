import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './scenes/user/login';
import MapIndex from './scenes/weather_data';
import Dashboard from './scenes/user/dashboard';
import { useLayoutEffect, useState } from 'react';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useLayoutEffect(() => {
    setAuthToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={authToken ? <MapIndex /> : <Navigate replace to="/login" />}
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
