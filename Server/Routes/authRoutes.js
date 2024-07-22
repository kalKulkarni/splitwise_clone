const express = require('express');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../Models/userModel');
const bcrypt = require('bcryptjs');

const router = express.Router();
const secretKey = 'secret_key';

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const user = await createUser(email, password);
  console.log(user,'User User');
  res.status(201).json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

module.exports = router;
