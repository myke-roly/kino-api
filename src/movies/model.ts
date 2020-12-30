import { Schema, model, Document, Model } from 'mongoose';

export interface MoviesI {
  creator: string;
  movieID: string;
  createAt?: string;
}

interface MoviesDocumentI extends MoviesI, Document {}
interface MoviesModelI extends Model<MoviesDocumentI> {}

const MoviesSchema = new Schema({
  creator: {
    type: String,
    required: true,
    trim: true,
  },
  movieID: {
    type: String,
    required: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Movies: MoviesModelI = model<MoviesDocumentI, MoviesModelI>('Movies', MoviesSchema);

export { Movies, MoviesDocumentI, MoviesModelI };
