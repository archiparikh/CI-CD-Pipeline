'use strict';

const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('returns welcome message and version', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/CI\/CD Pipeline Demo/);
    expect(res.body).toHaveProperty('version');
  });
});

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('uptime');
  });
});

describe('GET /greet/:name', () => {
  it('returns a greeting for the given name', async () => {
    const res = await request(app).get('/greet/World');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello, World!');
  });
});

describe('GET /unknown', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Not Found');
  });
});
