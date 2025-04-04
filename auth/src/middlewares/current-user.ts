import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const curentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    next();
    return;
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (error) {
    res.send({ currentUser: null });
  }

  next();
};

// ✔ Vérifie si l'utilisateur est authentifié via un token JWT dans la session
// ✔ Attache currentUser à req pour le rendre accessible dans les routes
// ✔ Passe au middleware suivant après vérification

// 👉 Ce middleware est utile pour savoir si un utilisateur est connecté, sans forcément bloquer l’accès à la route ! 🚀
