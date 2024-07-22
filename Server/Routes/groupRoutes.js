const express = require('express');
const { createGroup, getAllGroups } = require('../Models/groupModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/submit-group', async (req, res) => {
  const { name } = req.body;
  const group = await createGroup(name);
  res.status(201).json(group);
});

router.get('/get-group', async (req, res) => {
  const groups = await getAllGroups();
  res.status(200).json(groups);
});

module.exports = router;
