import React from 'react';
import { Link } from 'react-router-dom';

const ContinentCard = ({ continent }) => {
  return (
    <Link to={`/continents/${continent}`}>
      <div className="group bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl p-6 text-center shadow-md hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide group-hover:text-blue-500 transition-colors">
          {continent}
        </h2>
      </div>
    </Link>
  );
};

export default ContinentCard;
