import { connect } from 'mongoose';
import config from './config';

export const connectDB = async (): Promise<any> => {
  await connect(config.DB.URI_LOCAL, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((db) => console.log(`Data base connected on port ${db.connection.host}`))
    .catch((error) => console.log(error));
};
