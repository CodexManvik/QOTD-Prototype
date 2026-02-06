import User from '../models/User.js';

export const mockAuth = async (req, res, next) => {
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'] || 'free';

    // Allow public access for health check or specific routes if needed, 
    // but for the core API we generally want a user context.
    // However, the prompt says "fetch from dummy admin source... works end-to-end... code execution... daily leaderboard".
    // Leaderboard needs logged in users.

    // If no userId is provided, we can treat them as a "guest" or anonymous, 
    // but the limits are strict for Free users. 
    // Let's enforce userId for stateful operations in the Controllers, 
    // but here we try to attach the user if provided.

    if (!userId) {
        req.user = null;
        return next();
    }

    try {
        let user = await User.findOne({ userId });

        if (!user) {
            // Auto-register mock user
            user = await User.create({ userId, role: userRole });
        } else {
            // Check if we need to update the role (Simulation purposes)
            if (user.role !== userRole) {
                user.role = userRole;
                await user.save();
            }
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
