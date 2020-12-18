import { Schema, model, Document, Model } from 'mongoose';

interface UsersI {
  email: string;
  password: string;
  createAt?: string;
}

interface UsersDocumentI extends UsersI, Document {}
interface UsersModelI extends Model<UsersDocumentI> {}

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Users = model<UsersDocumentI>('Users', UsersSchema);

export { Users, UsersDocumentI, UsersModelI };
