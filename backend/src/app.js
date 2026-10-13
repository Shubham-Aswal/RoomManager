import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config({
  path: './.env',
});

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);

export default app;
