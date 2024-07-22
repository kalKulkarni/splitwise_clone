const pool = require('../db');

const createExpense = async (amount, payer, participants, date, notes) => {
  const result = await pool.query(
    'INSERT INTO expenses (amount, payer, participants, date, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [amount, payer, participants, date, notes]
  );
  return result.rows[0];
};

const getAllExpenses = async () => {
  const result = await pool.query('SELECT * FROM expenses');
  return result.rows;
};

const getExpenseById = async (id) => {
  const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [id]);
  return result.rows[0];
};

const updateExpense = async (id, amount, payer, participants, date, notes) => {
  const result = await pool.query(
    'UPDATE expenses SET amount = $1, payer = $2, participants = $3, date = $4, notes = $5 WHERE id = $6 RETURNING *',
    [amount, payer, participants, date, notes, id]
  );
  return result.rows[0];
};

const deleteExpense = async (id) => {
  await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
};

module.exports = { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense }