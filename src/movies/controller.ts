import { Request, Response } from 'express';
import { Movies, MoviesDocumentI } from './model';
import jwt from 'jsonwebtoken';

export const saveMovie = async (req: Request, res: Response) => {
  const { movieID } = req.body;
  console.log(movieID);
  if (!movieID) {
    return res.status(400).json({ message: 'Los datos son obligatorios.' });
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ auth: false, message: 'token no valido' });
    }

    const decode: any = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODE: ', decode);

    let movie: MoviesDocumentI = await Movies.findOne({ movieID });
    if (movie) {
      if (movie.creator === decode.user.id) {
        return res.status(403).json({ message: 'Pelicula ya guardada' });
      }
    }

    movie = new Movies({ movieID: movieID, creator: decode.user.id });

    await movie.save();
    return res.status(200).json({ message: 'Movie Saved' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ auth: false, message: 'token no valido' });
    }

    const decode: any = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODE: ', decode);

    let movies = await Movies.find({ creator: decode.user.id });
    if (!movies) {
      return res.status(403).json({ message: 'No tienes peliculas guardadas' });
    }

    console.log(movies);
    return res.status(200).json({ message: 'Movie Saved', movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
