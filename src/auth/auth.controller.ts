import { Response, Request } from 'express';
// import Axios, { AxiosResponse } from 'axios';
import { Users, UsersDocumentI } from '../db/models';
import { validateUser } from './helper';

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(404).json({ message: 'no se encontro nigun usurio registrado' });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return;

  try {
    let user: UsersDocumentI = await Users.findOne({ email });
    if (user) {
      return res.status(403).json({ message: 'ya exite un usuairio con ese email' });
    }

    user = new Users({ email, password });

    const payload = { user: { id: user._id, email: user.email } };
    const EXPIRE_TOKEN: number = 15000;
    const token = validateUser(payload, process.env.JWT_SECRET, EXPIRE_TOKEN);

    res.json({ message: 'Usuario creado correctamente.', token });

    await user.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return;
  }

  try {
    const user: UsersDocumentI = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No existe un usuario con ese email.' });
    }

    const isMath = await user.verifyPassword(password);

    if (!isMath) {
      return res.status(403).json({ message: 'La contrasena es incorrecta' });
    }

    const payload = { user: { id: user._id, email: user.email } };
    const EXPIRE_TOKEN: number = 15000;
    const token = validateUser(payload, process.env.JWT_SECRET, EXPIRE_TOKEN);
    return res.status(200).json({ message: 'Signin Success.', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
