import jwt from 'jsonwebtoken';

export function validateUser(payload: {}, secretToken: string, expiresIn: number): string {
  return jwt.sign(payload, secretToken, {
    expiresIn,
  });
}
