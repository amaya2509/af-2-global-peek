// src/components/StarField.jsx
import React, { useRef } from 'react';
import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const StarField = () => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      
      // Rotate the starfield group slowly
      groupRef.current.rotation.y += 0.0008;
      groupRef.current.rotation.x += 0.0004;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={100}    // Outer radius
        depth={50}      // Star spread depth
        count={4000}    // Number of stars
        factor={4}      // Size factor
        saturation={0}
        fade            // Enables fading
        speed={1}       // Twinkle speed
      />
    </group>
  );
};

export default StarField;
