import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './db';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;


export async function ensureLogTableExists() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS log (
      id SERIAL PRIMARY KEY,
      inserted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      json JSON NOT NULL
      )
  `);
}

app.use(cors());
app.use(bodyParser.json());
app.use('/log', routes);

async function main() {
  try {
    await ensureLogTableExists();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to initialize database or server:', err);
    process.exit(1);
  }
}

main();
