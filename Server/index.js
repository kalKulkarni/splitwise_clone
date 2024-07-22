const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');
const expenseRoutes = require('./Routes/expenseRoutes');
const groupRoutes = require('./Routes/groupRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);
app.use('/groups', groupRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})