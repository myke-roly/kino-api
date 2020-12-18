import { Response, Request } from 'express';
// import Axios, { AxiosResponse } from 'axios';
import { Users, UsersDocumentI, UsersModelI } from '../db/models';

export const signup = async (req: Request, res: Response) => {
  console.log('assssssssssss', req.body);

  try {
    let user = await Users.findOne({ email: 'mykeroly@gmail.com' });
    if (user) {
      return res.status(403).json({ message: 'ya exite un usuairio con ese email' });
    }

    user = new Users({ email: 'mykeroly@gmail.com', password: '555111444' });

    user.save();
    return res.json({ message: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = (_: Request, res: Response) => {
  res.json({ message: 'Iniciar Sesion' });
};

async function findUser(this: UsersModelI, is: string): Promise<UsersDocumentI> {
  const user = await this.findOne({ email: 'mykeroly@gmail.com' });
  if (user) return user;

  return this.create();
}
