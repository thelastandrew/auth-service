import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './routes';

export const app = express();

app.use(json());
app.use(cookieParser());
app.use(cors());
app.use('/auth', router);
