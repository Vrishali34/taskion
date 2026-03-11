// routes/taskRoutes.js

const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');


// GET all tasks
router.get('/', authenticateToken, taskController.getTasks);

// CREATE task
router.post('/', authenticateToken, taskController.createTask);

// UPDATE task
router.put('/:id', authenticateToken, taskController.updateTask);

// DELETE task
router.delete('/:id', authenticateToken, taskController.deleteTask);

module.exports = router;