import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CountryCard = ({ country, onClick }) => {

    const { code } = useParams();
console.log("Country code param:", code);
  return (
    <Link to={`/country/${country.cca3}`} className="no-underline">
    <div
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
      onClick={() => onClick && onClick(country)}
    >
      <img
        src={country.flags?.svg || country.flags?.png}
        alt={`${country.name.common} flag`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
          {country.name.common}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Region:</strong> {country.region}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default CountryCard;
