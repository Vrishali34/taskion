// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validateMiddleware');
const { registerSchema, loginSchema } = require('../validators/authValidator');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account. Email must be valid, password minimum 6 characters.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already registered
 */
router.post('/register', validate(registerSchema), authController.registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns a JWT token valid for 1 hour.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful, JWT token returned
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', validate(loginSchema), authController.loginUser);

module.exports = router;