// controllers/userController.js
import {
    addFavoriteCountry,
    removeFavoriteCountry,
    getFavoriteCountries,
  } from '../services/userService.js';
  
  export const addFavorite = async (req, res) => {
    const { countryCode } = req.body;
  
    try {
      const favorites = await addFavoriteCountry(req.user._id, countryCode);
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const removeFavorite = async (req, res) => {
    const { countryCode } = req.body;
  
    try {
      const favorites = await removeFavoriteCountry(req.user._id, countryCode);
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getFavorites = async (req, res) => {
    try {
      const favorites = await getFavoriteCountries(req.user._id);
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  