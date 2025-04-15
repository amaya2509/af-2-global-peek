// routes/userRoutes.js
import express from 'express';
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addFavorite);
router.delete('/favorites', protect, removeFavorite);

export default router;
