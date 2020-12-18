import { connect } from 'mongoose';

export const connectDB = async (): Promise<any> => {
  await connect('mongodb://mongo/kinodb', {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((db) => console.log(`Data base connected on port ${db.connection.host}`))
    .catch((error) => console.log(error));
};
