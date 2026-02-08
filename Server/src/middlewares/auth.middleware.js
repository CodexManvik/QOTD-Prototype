import jwt from 'jsonwebtoken';
import jsonUserStore from '../repositories/JsonUserStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'qotd-secret-key-change-in-production';

/**
 * JWT Authentication Middleware
 * Uses in-memory store for user data
 */
export const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        // Also support the legacy x-user-id header for backward compatibility
        const legacyUserId = req.headers['x-user-id'];
        const legacyUserRole = req.headers['x-user-role'];

        if (!authHeader && !legacyUserId) {
            req.user = null;
            return next();
        }

        // Handle legacy header-based auth (for backward compatibility)
        if (legacyUserId && !authHeader) {
            let user = await jsonUserStore.findOne({ userId: legacyUserId });

            if (!user) {
                user = await jsonUserStore.create({
                    userId: legacyUserId,
                    role: legacyUserRole || 'free',
                    dailyActivity: {
                        date: new Date().toISOString().split('T')[0],
                        runs: 0,
                        submissions: 0
                    }
                });
            } else if (legacyUserRole && user.role !== legacyUserRole) {
                user.role = legacyUserRole;
                await user.save();
            }

            req.user = user;
            return next();
        }

        // Handle JWT authentication
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Authentication Error',
                message: 'Invalid token format'
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find user
        const user = await jsonUserStore.findOne({ userId: decoded.userId });

        if (!user) {
            return res.status(401).json({
                error: 'Authentication Error',
                message: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                error: 'Authentication Error',
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Authentication Error',
                message: 'Token expired'
            });
        }
        next(error);
    }
};

/**
 * Require authentication middleware
 */
export const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Authentication required'
        });
    }
    next();
};

/**
 * Require specific role middleware
 */
export const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Authentication required'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Forbidden',
                message: `Role ${req.user.role} is not authorized for this action`
            });
        }

        next();
    };
};
