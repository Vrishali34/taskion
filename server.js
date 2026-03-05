// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Import task routes
const taskRoutes = require('./routes/taskRoutes');

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running',
    status: 'success'
  });
});

// Mount task routes
app.use('/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});