import React from 'react'
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
// import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App;