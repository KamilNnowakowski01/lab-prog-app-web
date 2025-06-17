import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import { authenticate } from './middlewares/authMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res): void => {
  res.send('Server working!');
});

app.use('/auth', authRoutes);

app.get('/protected', authenticate, (_req, res): void => {
  res.send('Protected route');
});

app.listen(3000, () => console.log('Server listening on http://localhost:3000'));
