const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'splitwise_clone',
  password: 'postgres',
  port: 5432,
});
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connection successful:', res.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

testConnection();
module.exports = pool;
