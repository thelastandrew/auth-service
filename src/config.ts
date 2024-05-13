import { config } from 'dotenv';

config();

export default {
  PORT: process.env.PORT as string,
  MONGO_URL: process.env.MONGO_URL as string,
};
