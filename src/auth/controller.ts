import { Response, Request } from 'express';

export const signup = (_: Request, res: Response) => {
  try {
    res.json({ message: 'Registrate' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = (_: Request, res: Response) => {
  res.json({ message: 'Iniciar Sesion' });
};
