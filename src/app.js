'use strict';

const express = require('express');

const app = express();

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the CI/CD Pipeline Demo API',
    version: process.env.APP_VERSION || '1.0.0',
  });
});

// Health check endpoint — used by Docker and load balancers
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Simple greeting endpoint
app.get('/greet/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
