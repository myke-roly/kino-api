import { connect } from 'mongoose';

export const connectDB = async (): Promise<any> => {
  await connect('', {
    useFindAndModify: true,
    useNewUrlParser: true,
  });
};
