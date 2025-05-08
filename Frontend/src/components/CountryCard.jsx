import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoriteContext';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CountryCard = ({ country, onClick }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = Array.isArray(favorites) && favorites.includes(country.cca3);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.info('🔒 Login to add favorites', {
        theme: 'dark',
        onClick: () => navigate('/login'),
        style: { cursor: 'pointer' },
      });
      return;
    }

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
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 tracking-wide">
              {country.name.common}
            </h2>

            {/* Highlighted Capital and Region */}
            <div className="space-y-2">
              <div className="flex items-center bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-md px-3 py-1 shadow-sm">
                <span className="mr-2 text-lg">🏙️</span>
                <span className="font-medium">Capital:</span>
                <span className="ml-1">{country.capital?.[0] || 'N/A'}</span>
              </div>

              <div className="flex items-center bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-md px-3 py-1 shadow-sm">
                <span className="mr-2 text-lg">🌍</span>
                <span className="font-medium">Region:</span>
                <span className="ml-1">{country.region}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Favorite Button */}
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
