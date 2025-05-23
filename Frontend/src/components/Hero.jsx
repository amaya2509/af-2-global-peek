import React from 'react';
import Earth from './Earth';

const Hero = ({ onSearch, onFilter }) => {
  return (
    <section className="backdrop mx-4 md:mx-16 mt-10 p-8 text-white relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Title and Description */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight ">
            Are you ready to explore countries Around the World ?
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Search any country by name or filter by region
          </p>
        </div>

        {/* Right Side: Earth Globe */}
        <div className="flex justify-center md:w-1/2 overflow-hidden">
          <Earth className="w-[260px] sm:w-[280px] md:w-[320px] " />
        </div>
      </div>

      {/* Centered Search and Filter */}
      <div className="flex flex-col md:flex-row justify-center gap-4 max-w-2xl mx-auto mt-8">
        <input
          type="text"
          placeholder="Search country..."
          onChange={(e) => onSearch(e.target.value)}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 w-full md:w-auto"
        />
        <select
          onChange={(e) => onFilter(e.target.value)}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 w-full md:w-auto"
        >
          <option className='text-black' value="">All Regions</option>
          <option className='text-black' value="Africa">Africa</option>
          <option className='text-black' value="Americas">Americas</option>
          <option className='text-black' value="Asia">Asia</option>
          <option className='text-black' value="Antarctica">Antarctica</option>
          <option className='text-black' value="Europe">Europe</option>
          <option className='text-black' value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default Hero;
