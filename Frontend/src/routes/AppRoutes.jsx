import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import CountryDetails from '../pages/CountryDetails.jsx';
import Favorites from '../pages/Favorites.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const AppRoutes = () => {
  return(
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path='/country/:code' element={<CountryDetails />} />
    
    {/* Protected Route */}
    <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />

  </Routes>
  )
}

export default AppRoutes;