import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log('TOKEN: ', token);

  if (!token) {
    return res.status(400).json({ auth: false, message: 'token no valido' });
  }

  try {
    const decode = jwt.verify(token.toString(), process.env.JWT_SECRET);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'invalid token' });
  }
};
