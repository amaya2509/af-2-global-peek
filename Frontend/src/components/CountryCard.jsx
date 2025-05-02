import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoriteContext';

const CountryCard = ({ country, onClick }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = Array.isArray(favorites) && favorites.some((fav) => fav === country.cca3);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    toggleFavorite(country);
  };

  return (
    <div className="relative">
      <Link
        to={`/country/${country.cca3}`}
        className="no-underline"
        onClick={() => onClick && onClick(country)}
      >
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
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

      {/* Favorite Toggle Button */}
      <button
        onClick={handleFavoriteClick}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute top-3 right-3 text-xl bg-white bg-opacity-70 rounded-full p-1 hover:scale-110 transition"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default CountryCard;
