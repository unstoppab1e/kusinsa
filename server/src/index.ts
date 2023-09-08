import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  dotenv.config({ path: '.prod.env' });
} else {
  console.log('Running in development mode');
  dotenv.config({ path: '.dev.env' });
}

const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

import shopRouter from './shop';
app.use(shopRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
