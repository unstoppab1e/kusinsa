import { config } from 'dotenv';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  config({ path: '.prod.env' });
} else {
  console.log('Running in development mode');
  config({ path: '.dev.env' });
}

const { DATABASE_URL } = process.env;

const databaseUrl = drizzle(
  postgres(DATABASE_URL!, { ssl: 'require', max: 1 })
);

const main = async () => {
  try {
    await migrate(databaseUrl, { migrationsFolder: 'drizzle' });
    console.log('Migration successful');
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

main();
