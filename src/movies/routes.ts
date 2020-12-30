import { Router } from 'express';
import { getMovies, saveMovie } from './controller';
import auth from './middleware';

export const route = Router();

route.post('/save', saveMovie);
route.get('/get', getMovies);
