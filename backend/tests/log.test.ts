import request from 'supertest';
import express from 'express';
import routes from '../src/routes';

import { ensureLogTableExists } from '../src';

const app = express();
app.use(express.json());
app.use('/log', routes);

beforeAll(async () => {
  await ensureLogTableExists();
});

describe('Log API', () => {
  it('GET /log should return an array', async () => {
    const res = await request(app).get('/log');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /log should insert and return the log', async () => {
    const payload = { hello: 'world' };
    const res = await request(app)
      .post('/log')
      .send(payload)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('json');
    expect(res.body.json).toEqual(payload);
  });
});

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
};
