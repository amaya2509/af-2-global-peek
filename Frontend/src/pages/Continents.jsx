import React from 'react';
import ContinentCard from '../components/ContinentCard';
import ContinentCarousel from '../components/ContinentCarousel';

const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

const Continents = () => {
  return (
    <div className="p-6 space-y-8">
      
      {/* Carousel goes on top */}
      <ContinentCarousel />

      {/* Grid of continent cards below the carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {continents.map((c) => (
          <ContinentCard key={c} continent={c} />
        ))}
      </div>
      
    </div>
  );
};

export default Continents;
