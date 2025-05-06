import React from 'react';
import { Canvas } from '@react-three/fiber';
import StarField from './components/StarField';
import Background from './components/Background';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <>
      {/* Optional static image layer */}
      <Background />

      {/* Full-screen animated stars */}
      <div className="fixed inset-0 z-[-1]">
        <Canvas>
          <StarField />
        </Canvas>
      </div>

      {/* Main content */}
      <div className="relative z-10 pt-20">
        <Navbar />
        <AppRoutes />
      </div>
    </>
  );
};

export default App;
