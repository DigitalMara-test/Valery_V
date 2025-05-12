import { Router } from 'express';
import pool from './db';

const router = Router();

// POST /log — add data
router.post('/', async (req, res) => {
  const data = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO log (json) VALUES ($1) RETURNING *',
      [data]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

// GET /log — get all data
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM log ORDER BY inserted_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Select error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;
