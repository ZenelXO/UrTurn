import { Request, Response, NextFunction } from 'express';
import { firebaseAuth } from './firebase';

declare global {
  namespace Express {
    interface Request {
      user?: { uid: string }; // puedes extender con más campos si lo necesitas
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[Auth Middleware] No token provided');
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    req.user = { uid: decodedToken.uid }; // solo lo necesario para identificar al usuario
    next();
  } catch (error) {
    console.error('[Auth Middleware] Token inválido:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};
