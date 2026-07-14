const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple request logging for debugging (prints method and path)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/admin', require('./routes/admin'));

// Diagnostic endpoint to check DB connection and required env vars
app.get('/api/dbstatus', (req, res) => {
  try {
    const state = mongoose.connection.readyState; // 0 disconnected, 1 connected, 2 connecting, 3 disconnecting
    return res.json({
      dbReadyState: state,
      env: {
        MONGO_URI_SET: !!process.env.MONGO_URI,
        JWT_SECRET_SET: !!process.env.JWT_SECRET
      }
    });
  } catch (err) {
    console.error('DB status error:', err.stack || err);
    return res.status(500).json({ error: err.message || 'Error checking DB status' });
  }
});

app.get('/', (req, res) => res.send('API Running'));
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
