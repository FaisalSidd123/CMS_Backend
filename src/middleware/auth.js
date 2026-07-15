import jwt from 'jsonwebtoken';
import { ErrorResponse } from './errorHandler.js';

// Protect endpoints and verify token validation
export const protect = (req, res, next) => {
  let token;

  // Retrieve JWT from Authorization Header format 'Bearer tokenString'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route. Missing authorization token.', 401));
  }

  try {
    // Verify token validity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user identity info (id, email, role) to Express request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role // 'client' | 'agent' | 'admin'
    };
    
    next();
  } catch (err) {
    return next(new ErrorResponse('Token expired or validation failed. Access denied.', 401));
  }
};

// Grant access based on specific role parameters
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorResponse(`Role [${req.user?.role || 'Guest'}] is not authorized to access this endpoint.`, 403));
    }
    next();
  };
};
