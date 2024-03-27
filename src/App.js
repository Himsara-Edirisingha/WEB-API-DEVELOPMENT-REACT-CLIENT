import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './scenes/user/login';
import MapIndex from './scenes/weather_data';
import Dashboard from './scenes/user/dashboard';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={localStorage.getItem('token')? <Dashboard /> : <Navigate replace to="/login" />}
        />
        <Route path="/" element={<MapIndex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
