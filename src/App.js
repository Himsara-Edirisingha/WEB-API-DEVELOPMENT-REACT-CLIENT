import React from 'react';
import ReactDOM from 'react-dom';
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
          element={localStorage.getItem('token') ? < Dashboard/> : <Navigate replace to="/login" />}
        />
        <Route path="/" element={<MapIndex />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App/>,document.getElementById("root"));
