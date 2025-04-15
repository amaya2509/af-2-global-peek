import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

app.post('/test', (req, res) => {
  res.send('Test working');
});


app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/users', userRoutes); // Use user routes

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
