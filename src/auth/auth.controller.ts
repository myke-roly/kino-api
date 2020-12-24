import { Response, Request } from 'express';
import { Users, UsersDocumentI } from '../db/models';
import { generateToken } from './helper';
// import { sendRequestCreateAccount } from './mail';

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(404).json({ message: 'no se encontro ningun usuario registrado' });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const signup = async (req: Request, res: Response) => {
  // validar email caracteres raros y seguridad

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ message: 'el email y la contrasena son obligatorios' });
  }

  // TODO: enviar al email un diseno con el token en el boton
  // Create account to magic email (suspended for now)
  // const options = {
  //   to: email,
  //   subject: 'Create a new account',
  // };
  // sendRequestCreateAccount(options).catch((err) => console.log(err));

  try {
    let user: UsersDocumentI = await Users.findOne({ email });
    if (user) {
      return res.status(403).json({ message: 'ya exite un usuario con ese email' });
    }

    user = new Users({ email, password });

    const token = generateToken(user);

    res.status(200).json({ message: 'Usuario creado correctamente.', token });

    await user.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Los datos son obligatorios.' });
  }

  try {
    const user: UsersDocumentI = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No existe un usuario con ese email.' });
    }

    const isMath = await user.verifyPassword(password);

    if (!isMath) {
      return res.status(403).json({ message: 'La contraseña es incorrecta' });
    }

    const token = generateToken(user);
    return res.status(200).json({ message: 'Signin Success.', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
