const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipes',
  password: '12345',
  port: 5432, // Default port for PostgreSQL
});

module.exports = pool;