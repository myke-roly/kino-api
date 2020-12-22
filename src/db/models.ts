import { Schema, model, Document, Model, Query } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface UsersI {
  email: string;
  password: string;
  createAt?: string;
  findUser(email: string): void;
  encryptPassword(password: string): string;
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

UsersSchema.pre<UsersDocumentI>('save', function (next) {
  const user = this;
  console.log(user);
  if (!this.isModified('password')) return next();

  user.password = encryptPassword(user.password);
  next();
});

function encryptPassword(password: string): string {
  const salt = bcryptjs.genSaltSync(10);
  console.log(typeof bcryptjs.hashSync(password, salt));
  return bcryptjs.hashSync(password, salt);
}

UsersSchema.statics.findUser = (user: UsersModelI, email: string) => {
  return user.findOne({ email });
};

const Users: UsersModelI = model<UsersDocumentI, UsersModelI>('Users', UsersSchema);

export { Users, UsersDocumentI, UsersModelI };
