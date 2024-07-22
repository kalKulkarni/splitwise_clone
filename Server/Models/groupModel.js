const pool = require('../db');

const createGroup = async (name) => {
  const result = await pool.query('INSERT INTO groups (name) VALUES ($1) RETURNING *', [name]);
  return result.rows[0];
};

const getAllGroups = async () => {
  const result = await pool.query('SELECT * FROM groups');
  return result.rows;
};

module.exports = { createGroup, getAllGroups };
