import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares';

export const app = express();

app.use(json());
app.use(cookieParser());
app.use(cors());
app.use('/auth', router);
app.use(errorHandler);
