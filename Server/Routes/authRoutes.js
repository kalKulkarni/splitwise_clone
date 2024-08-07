// const express = require('express');
// const jwt = require('jsonwebtoken');
// const { createUser, findUserByEmail } = require('../Models/userModel');
// const bcrypt = require('bcryptjs');

// const router = express.Router();
// const secretKey = 'secret_key'; // Consider moving this to an environment variable

// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await createUser(name, email, hashedPassword);
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Signup error', error);
//     res.status(500).json({ message: 'Internel server error while Signup' });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await findUserByEmail(email);
//     if (user && await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' });
//       res.json({ token });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error('Login error', error);
//     res.status(500).json({ message: 'Internal server error while Login' });
//   }
// });

// module.exports = router;


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