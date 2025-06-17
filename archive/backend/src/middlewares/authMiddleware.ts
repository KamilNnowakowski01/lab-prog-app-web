import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwtUtils';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const payload = verifyAccessToken(token) as any;
    // Jeśli chcesz typować req.userId, dodaj deklarację globalną albo użyj rozszerzenia `req`
    (req as any).userId = payload.userId;
    next();
  } catch {
    res.sendStatus(403);
    return;
  }
}
