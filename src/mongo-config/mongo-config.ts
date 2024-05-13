import mongoose from 'mongoose';
import config from '../config';

const { MONGO_URL } = config;

export const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URL, { dbName: 'development' });
    console.log('Connected to a mongo server');
  } catch (error) {
    mongoose.connection.close();
    console.log('Cannot connect to a mongo server.', error);
  }
};
