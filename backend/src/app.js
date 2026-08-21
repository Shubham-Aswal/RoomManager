import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
app.use(express.json());
dotenv.config({
  path: '../.env',
});

app.use(
  cors({
    origin: process.env.ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
);

export default app;
