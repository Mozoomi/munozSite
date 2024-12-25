const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON in request bodies
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const adminRoutes = require('./routes/admin');
const imageRoutes = require('./routes/images');

// Serve static files for the user-facing frontend
app.use(express.static(path.join(__dirname, '../frontend/user')));

// Serve static files for the admin frontend
app.use('/admin', express.static(path.join(__dirname, '../frontend/admin')));

// API routes
app.use('/api/admin', adminRoutes);
app.use('/api/images', imageRoutes);

// Catch-all route to serve the user-facing index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/user/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});