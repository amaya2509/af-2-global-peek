import express from 'express';
import { register, login } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/logout', (req, res) => {
    // frontend should remove token on logout
    res.status(200).json({ message: 'Logged out successfully' });
  });
  
router.get('/profile', protect, (req, res) => {
  res.status(200).json(req.user); // current logged-in user details
});


export default router;
