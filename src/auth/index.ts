import { Router } from 'express';
import { signin, signup } from './controller';

export const route = Router();

route.get('/signup', signup);

route.post('/signup', signin);
