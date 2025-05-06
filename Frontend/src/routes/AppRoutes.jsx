import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import CountryPage from '../pages/CountryPage.jsx';
import Favorites from '../pages/Favorites.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Continents from '../pages/Continents';
import ContinentCountries from '../pages/ContinentCountries';

const AppRoutes = () => {
  return(
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path='/country/:code' element={<CountryPage />} />
    <Route path="/continents" element={<Continents />} />
    <Route path="/continents/:continentName" element={<ContinentCountries />} />
    
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