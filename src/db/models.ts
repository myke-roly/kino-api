import { Schema, model, Document, Model } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface UsersI {
  email: string;
  password: string;
  createAt?: string;
  encryptPassword(password: string): string;
  verifyPassword(password: string): Promise<boolean>;
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

function encryptPassword(password: string): string {
  const salt = bcryptjs.genSaltSync(10);

  return bcryptjs.hashSync(password, salt);
}

UsersSchema.pre<UsersDocumentI>('save', function (next) {
  const user = this;
  if (!this.isModified('password')) return next();

  user.password = encryptPassword(user.password);
  next();
});

UsersSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
  const user = this;
  return await bcryptjs.compare(password, user.password);
};

const Users: UsersModelI = model<UsersDocumentI, UsersModelI>('Users', UsersSchema);

export { Users, UsersDocumentI, UsersModelI };
