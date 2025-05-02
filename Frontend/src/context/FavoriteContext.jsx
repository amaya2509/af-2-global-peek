import React, { createContext, useContext, useEffect, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteApi.js";

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);       // stores array of codes like ['USA', 'LKA']
  const [favoritesLoaded, setFavoritesLoaded] = useState(false); // new flag to signal when loading is done

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
const codes = Array.isArray(data)
  ? data
  : Array.isArray(data.favorites)
    ? data.favorites
    : [];

  
      setFavorites(codes);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setFavoritesLoaded(true);
    }
  };
  

  const toggleFavorite = async (country) => {
    try {
      const code = country.cca3;

      if (favorites.includes(code)) {
        await removeFavorite(code);
        setFavorites((prev) => prev.filter((c) => c !== code));
      } else {
        await addFavorite(code);
        setFavorites((prev) => [...prev, code]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, favoritesLoaded }}>
      {children}
    </FavoriteContext.Provider>
  );
};
