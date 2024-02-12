import dotenv from 'dotenv';

import express from 'express';
import { urlRoutes } from './routes';
import { connectMongoDB } from './database';

if(process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

connectMongoDB()

const app = express();

app.use(express.json());

app.use(urlRoutes);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
})