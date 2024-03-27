import React, { useState, useEffect } from 'react';
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import MapIndex from './scenes/weather_data/index'
import Login from './scenes/user/login'
import { Dashboard } from '@mui/icons-material';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={isAuthenticated ? (<Dashboard />) : (<Navigate replace to={"/login"} />)} />
      <Route path="/" element={<MapIndex />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App
