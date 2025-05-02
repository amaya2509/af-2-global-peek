import React from 'react';

const Hero = ({ onSearch, onFilter }) => {
    return (
      <section className="bg-blue-100 py-10 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Countries Around the World</h1>
        <p className="text-gray-700 mb-6">Search by name or filter by region</p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search country..."
            onChange={(e) => onSearch(e.target.value)}
            className="px-4 py-2 rounded border w-full"
          />
          <select
            onChange={(e) => onFilter(e.target.value)}
            className="px-4 py-2 rounded border w-full md:w-auto"
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </section>
    );
  };
  
  export default Hero;
  