// controllers/authController.js

const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// REGISTER USER
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
      [email, hashedPassword]
    );

    res.status(201).json({
      status: 'success',
      data: newUser.rows[0]
    });

  } catch (error) {
    next(error);
  }
};


// LOGIN USER
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    const existingUser = user.rows[0];

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      status: 'success',
      token
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  registerUser,
  loginUser
};