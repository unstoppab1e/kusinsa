import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/postgres-js';
import { Response, Request } from 'express';

const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
  ssl: { rejectUnauthorized: false },
});
const db = drizzle(pool);

const handleQuertError = (err: any, res: Response) => {
  console.error('Error executing query:', err);
  res.status(500).json({ error: 'Internal server error' });
};
