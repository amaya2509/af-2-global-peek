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
        <div className="bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl rounded-xl overflow-hidden transition-transform transform hover:scale-[1.03] hover:shadow-2xl duration-300">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`${country.name.common} flag`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 tracking-wide">
              {country.name.common}
            </h2>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</li>
              <li><strong>Region:</strong> {country.region}</li>
              <li><strong>Population:</strong> {country.population.toLocaleString()}</li>
            </ul>
          </div>
        </div>
      </Link>

      {/* Favorite Toggle Button */}
      <button
        onClick={handleFavoriteClick}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute top-3 right-3 text-xl bg-white/80 dark:bg-gray-900/70 text-red-500 dark:text-white rounded-full p-2 hover:scale-110 transition-transform shadow-md"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default CountryCard;
