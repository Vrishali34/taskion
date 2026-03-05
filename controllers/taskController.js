const pool = require('../config/db');

// GET all tasks
const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.json({ status: 'success', data: result.rows });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// CREATE task
const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ status: 'error', message: 'Title is required' });
    }

    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    );

    res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// UPDATE task
const updateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
      [title, completed, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }

    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }

    res.json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };