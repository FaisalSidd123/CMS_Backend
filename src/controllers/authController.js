import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../middleware/errorHandler.js';

// Static mock users database matching the frontend identities
const mockUsers = [
  {
    id: 'cust-9428',
    name: 'Alexander Sterling',
    email: 'alexander@vanguard.com',
    password: 'password123',
    role: 'client'
  },
  {
    id: 'agent-101',
    name: 'Sarah Connor',
    email: 'sarah.connor@vanguardmotors.com',
    password: 'password123',
    role: 'agent'
  },
  {
    id: 'adm-01',
    name: 'Chief Executive Operator',
    email: 'admin@vanguard.com',
    password: 'password123',
    role: 'admin'
  }
];

// @desc    Authenticate User & Issue Token
// @route   POST /api/auth/login
// @access  Public
export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password credentials.', 400));
  }

  // Find user match in mock base
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return next(new ErrorResponse('Invalid authentication credentials.', 401));
  }

  // Generate JWT Token payload
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

// @desc    Get Current Logged In User Profile details
// @route   GET /api/auth/me
// @access  Private
export const getMe = (req, res, next) => {
  // User identity is already verified and attached to req.user by protect middleware
  const user = mockUsers.find(u => u.id === req.user.id);
  
  if (!user) {
    return next(new ErrorResponse('User profile not found in active registries.', 404));
  }

  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};
