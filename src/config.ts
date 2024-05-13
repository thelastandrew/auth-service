import { config } from 'dotenv';

config();

export default {
  PORT: process.env.PORT as string,
  MONGO_URL: process.env.MONGO_URL as string,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
};
