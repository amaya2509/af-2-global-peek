import React from 'react';
import { Canvas } from '@react-three/fiber';
import StarField from './components/StarField';
import Background from './components/Background';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Background />

      {/* Star background */}
      <div className="fixed inset-0 z-[-1]">
        <Canvas>
          <StarField />
        </Canvas>
      </div>

      {/* Toast container (for messages like 'Login to add favorites') */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Main content */}
      <div className="relative z-10 pt-20">
        <Navbar />
        <AppRoutes />
      </div>
    </>
  );
};

export default App;
