"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/tests/log.test.ts
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../src/routes"));
const index_1 = require("../src/index");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/log', routes_1.default);
beforeAll(async () => {
    await (0, index_1.ensureLogTableExists)();
});
describe('Log API', () => {
    it('GET /log should return an array', async () => {
        const res = await (0, supertest_1.default)(app).get('/log');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('POST /log should insert and return the log', async () => {
        const payload = { hello: 'world' };
        const res = await (0, supertest_1.default)(app)
            .post('/log')
            .send(payload)
            .set('Content-Type', 'application/json');
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('json');
        expect(res.body.json).toEqual(payload);
    });
});
// backend/jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
};
