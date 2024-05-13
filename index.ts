import { app } from './src/app';
import config from './src/config';
import { connectToMongo } from './src/mongo-config';

const { PORT } = config;

const start = async () => {
  await connectToMongo();
  app.listen(PORT, () => {
    console.log(`Servr is up and running on port ${PORT}`);
  });
};

start();
