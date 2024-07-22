const express = require('express');
const { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } = require('../Models/expenseModel')
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/submit-expenses', async (req, res) => {
  const { amount, payer, participants, date, notes } = req.body;
  const expense = await createExpense(amount, payer, participants, date, notes);
  res.status(201).json(expense);
});

router.get('/get-expenses', async (req, res) => {
  const expenses = await getAllExpenses();
  res.status(200).json(expenses);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const expense = await getExpenseById(id);
  if (expense) {
    res.status(200).json(expense);
  } else {
    res.status(404).json({ message: 'Expense not found' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, payer, participants, date, notes } = req.body;
  const expense = await updateExpense(id, amount, payer, participants, date, notes);
  if (expense) {
    res.status(200).json(expense);
  } else {
    res.status(404).json({ message: 'Expense not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await deleteExpense(id);
  res.status(204).send();
});

module.exports = router;
