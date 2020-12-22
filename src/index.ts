import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
dotenv.config();

import { connectDB } from './db';

import { authRouter, initialRoute } from './routes';

connectDB();
console.log('HELLO');
const app: Express = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(morgan('common'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', initialRoute);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  return console.log(`Server listen on port: ${PORT}`);
});
