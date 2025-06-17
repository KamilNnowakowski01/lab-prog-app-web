import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { users } from '../data/users';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwtUtils';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();
const refreshStore = new Map<string, string>();

// POST /auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    res.status(401).send('Invalid credentials');
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).send('Invalid credentials');
    return;
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  refreshStore.set(user.id, refreshToken);

  res.json({ accessToken, refreshToken });
});

// POST /auth/refresh
router.post('/refresh', (req: Request, res: Response): void => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(401).send('No token');
    return;
  }

  try {
    const { userId } = verifyRefreshToken(refreshToken) as any;
    const stored = refreshStore.get(userId);
    if (stored !== refreshToken) {
      res.status(403).send('Invalid token');
      return;
    }

    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);
    refreshStore.set(userId, newRefreshToken);

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch {
    res.status(403).send('Invalid refresh token');
  }
});

// GET /auth/me
router.get('/me', authenticate, (req: Request, res: Response): void => {
  const userId = (req as any).userId;
  const user = users.find(u => u.id === userId);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  const { passwordHash, ...safeUser } = user;
  res.json(safeUser);
});

export default router;
