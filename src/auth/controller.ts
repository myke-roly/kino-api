import { Response, Request } from 'express';
import Axios, { AxiosResponse } from 'axios';

export const signup = async (req: Request, res: Response) => {
  console.log('assssssssssss', req.body);

  try {
    res.json({ message: 'Registrate' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = (_: Request, res: Response) => {
  res.json({ message: 'Iniciar Sesion' });
};
