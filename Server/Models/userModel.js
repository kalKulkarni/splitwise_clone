// const pool = require('../db');
// const bcrypt = require('bcryptjs');

// const createUser = async (email, password) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const result = await pool.query(
//     'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
//     [email, hashedPassword]
//   );
//   return result.rows[0];
// };

// const findUserByEmail = async (email) => {
//   const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//   return result.rows[0];
// };

// module.exports = { createUser, findUserByEmail };



// In your userModel.js or equivalent file

const db = require('../db'); // Adjust the path to your database module
const bcrypt = require('bcryptjs');
const pool = require('../db');

async function findUserByEmail(email) {
  console.log('Finding user with email:', email);
  
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log('User found:', user);
      return user;
    } else {
      console.log('No user found with email:', email);
      return null;
    }
  } catch (error) {
    console.error('Error querying user by email:', error);
    throw error;
  }
}

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );
  return result.rows[0];
};


module.exports = { createUser, findUserByEmail };