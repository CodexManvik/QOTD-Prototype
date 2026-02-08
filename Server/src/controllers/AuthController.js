import jwt from 'jsonwebtoken';
import jsonUserStore from '../repositories/JsonUserStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'qotd-secret-key-change-in-production';
const JWT_EXPIRES_IN = '24h';

class AuthController {
    /**
     * Register a new user
     * POST /api/v1/auth/register
     */
    async register(req, res, next) {
        try {
            const { email, password, name, role } = req.body;

            // Validation
            if (!email || !password) {
                return res.status(400).json({
                    error: 'Validation Error',
                    message: 'Email and password are required'
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Validation Error',
                    message: 'Password must be at least 6 characters'
                });
            }

            // Check if user already exists
            const existingUser = await jsonUserStore.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.status(409).json({
                    error: 'Conflict',
                    message: 'User with this email already exists'
                });
            }

            // Create user with email as userId for simplicity
            const userId = email.toLowerCase().replace(/[^a-z0-9]/g, '_');

            const user = await jsonUserStore.create({
                userId,
                email: email.toLowerCase(),
                password,
                name: name || email.split('@')[0],
                role: role || 'free',
                dailyActivity: {
                    date: new Date().toISOString().split('T')[0],
                    runs: 0,
                    submissions: 0
                }
            });

            // Generate JWT
            const token = jwt.sign(
                { userId: user.userId, role: user.role },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: user.toPublicJSON()
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Login user
     * POST /api/v1/auth/login
     */
    async login(req, res, next) {
        try {
            const { email, password, role } = req.body;

            // Validation
            if (!email || !password) {
                return res.status(400).json({
                    error: 'Validation Error',
                    message: 'Email and password are required'
                });
            }

            // Find user
            let user = await jsonUserStore.findOne({ email: email.toLowerCase() });

            if (!user) {
                // Auto-create user on first login (demo mode)
                const userId = email.toLowerCase().replace(/[^a-z0-9]/g, '_');

                user = await jsonUserStore.create({
                    userId,
                    email: email.toLowerCase(),
                    password,
                    name: email.split('@')[0],
                    role: role || 'free',
                    dailyActivity: {
                        date: new Date().toISOString().split('T')[0],
                        runs: 0,
                        submissions: 0
                    }
                });

                const token = jwt.sign(
                    { userId: user.userId, role: user.role },
                    JWT_SECRET,
                    { expiresIn: JWT_EXPIRES_IN }
                );

                return res.status(200).json({
                    message: 'User created and logged in',
                    token,
                    user: user.toPublicJSON()
                });
            }

            // Check password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({
                    error: 'Authentication Error',
                    message: 'Invalid credentials'
                });
            }

            // Update role if provided (for demo purposes)
            if (role && user.role !== role) {
                user.role = role;
                await user.save();
            }

            // Generate JWT
            const token = jwt.sign(
                { userId: user.userId, role: user.role },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.status(200).json({
                message: 'Login successful',
                token,
                user: user.toPublicJSON()
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get current user profile
     * GET /api/v1/auth/me
     */
    async getCurrentUser(req, res, next) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'No authentication token provided'
                });
            }

            res.status(200).json({
                user: req.user.toPublicJSON()
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update user role (for demo/testing)
     * PATCH /api/v1/auth/role
     */
    async updateRole(req, res, next) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'No authentication token provided'
                });
            }

            const { role } = req.body;
            if (!['free', 'paid', 'admin'].includes(role)) {
                return res.status(400).json({
                    error: 'Validation Error',
                    message: 'Invalid role. Must be free, paid, or admin'
                });
            }

            req.user.role = role;
            await req.user.save();

            res.status(200).json({
                message: 'Role updated successfully',
                user: req.user.toPublicJSON()
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
