import React from 'react';

const Background = () => {
  return (
    <div
      className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat brightness-75"
      style={{ backgroundImage: "url('/galaxy-bg.png')" }}
    />
  );
};

export default Background;
