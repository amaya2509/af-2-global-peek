import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoriteContext';
import CountryCard from '../components/CountryCard';
import axios from 'axios';

const Favorites = () => {
  const { favorites, favoritesLoaded } = useFavorites(); // ✅ include loading flag
  const [allCountries, setAllCountries] = useState([]);
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        setAllCountries(res.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Filter favorite countries after both lists are loaded
  useEffect(() => {
    if (favoritesLoaded && allCountries.length > 0) {
      const filtered = allCountries.filter((c) => favorites.includes(c.cca3));
      setFavoriteCountries(filtered);
      setLoading(false);
    }
  }, [favorites, allCountries, favoritesLoaded]);

  return (
    <div className="px-4 py-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Favorite Countries
      </h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading favorites...</p>
      ) : favoriteCountries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          You haven't added any favorite countries yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
