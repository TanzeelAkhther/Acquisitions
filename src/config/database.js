import 'dotenv/config';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL);    // Create a Neon SQL client using the DATABASE_URL from environment variables

const db = drizzle(sql); // Initialize Drizzle ORM with the Neon SQL client

export { db, sql };  // Export the database instance and SQL client for use in other modules