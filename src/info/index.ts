import { Router, Response } from 'express';

export const route = Router();

interface PersonalInfoI {
  name: string;
  author: {};
  createAt: string;
}

const personalInfo: PersonalInfoI = {
  name: 'KINO API',
  author: {
    name: 'Mike',
    age: 25,
    email: 'mykeroly@gmail.com',
  },
  createAt: '2020-12-16T07:37:28.462Z',
};

route.get('/', (_, res: Response) => res.json(personalInfo));
