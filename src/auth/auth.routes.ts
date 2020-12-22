import { Router } from 'express';
import { getUsers, signin, signup } from './auth.controller';

export const route = Router();

route.get('/signup', getUsers);
route.post('/signup', signup);

route.get('/sigin', signin);
