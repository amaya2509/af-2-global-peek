// src/context/FavoriteContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase.js';
import { AuthContext } from './AuthContext';

const FavoriteContext = createContext();

export const useFavorites = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  const loadFavorites = async () => {
    if (!user) return;
  
    const docRef = doc(db, 'favorites', user.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setFavorites(docSnap.data().codes || []);
    } else {
      await setDoc(docRef, { codes: [] });
      setFavorites([]);
    }
  
    setFavoritesLoaded(true);
  };
  

  const toggleFavorite = async (country) => {
    if (!user) return;
    const code = country.cca3;
    const docRef = doc(db, 'favorites', user.uid);

    try {
      if (favorites.includes(code)) {
        await updateDoc(docRef, {
          codes: arrayRemove(code),
        });
        setFavorites((prev) => prev.filter((c) => c !== code));
      } else {
        await updateDoc(docRef, {
          codes: arrayUnion(code),
        });
        setFavorites((prev) => [...prev, code]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  useEffect(() => {
    if (user) loadFavorites();
  }, [user]);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, favoritesLoaded }}>
      {children}
    </FavoriteContext.Provider>
  );
};
