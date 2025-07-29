
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');
const { db, createTransactionsTable } = require('./models/Transaction');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:9002'
}));
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);

// Database Connection and Server Initialization
db.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database.');
    createTransactionsTable(); // Ensure the table exists
    connection.release();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });
