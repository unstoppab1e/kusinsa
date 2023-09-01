import dotenv from 'dotenv';
import express from 'express';
import { shopRouter } from './shop';

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  dotenv.config({ path: '.prod.env' });
} else {
  console.log('Running in development mode');
  dotenv.config({ path: '.dev.env' });
}

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use(shopRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
