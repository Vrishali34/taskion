const pool = require('../config/db');

// GET all tasks for logged-in user
const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC',
      [userId]
    );

    res.status(200).json({
      status: 'success',
      data: result.rows
    });

  } catch (err) {
    next(err);
  }
};


// CREATE task for logged-in user
const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    const userId = req.user.userId;

    if (!title) {
      const error = new Error('Title is required');
      error.statusCode = 400;
      return next(error);
    }

    const result = await pool.query(
      'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, userId]
    );

    res.status(201).json({
      status: 'success',
      data: result.rows[0]
    });

  } catch (err) {
    next(err);
  }
};


// UPDATE task (only if it belongs to logged-in user)
const updateTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const userId = req.user.userId;

    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           completed = COALESCE($2, completed)
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [title, completed, taskId, userId]
    );

    if (result.rows.length === 0) {
      const error = new Error('Task not found or not authorized');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: 'success',
      data: result.rows[0]
    });

  } catch (err) {
    next(err);
  }
};


// DELETE task (only if it belongs to logged-in user)
const deleteTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const userId = req.user.userId;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [taskId, userId]
    );

    if (result.rows.length === 0) {
      const error = new Error('Task not found or not authorized');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: 'success',
      data: result.rows[0]
    });

  } catch (err) {
    next(err);
  }
};


module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};