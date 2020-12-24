import jwt from 'jsonwebtoken';
import { UsersDocumentI } from '../db/models';

export function generateToken(user: UsersDocumentI): string {
  const secretToken = process.env.JWT_SECRET;
  const payload = { user: { id: user._id, email: user.email } };
  const expiresIn: number = 15000;

  return jwt.sign(payload, secretToken, {
    expiresIn,
  });
}
