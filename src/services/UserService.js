import User from '../models/User.js';

class UserService {
    /**
     * Check if user has sufficient quota and increment if 'increment' is true.
     * @param {Object} user - The user document
     * @param {string} type - 'run' or 'submit'
     * @returns {Promise<void>}
     * @throws {Error} if limit exceeded
     */
    async checkAndIncrementLimit(user, type) {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // Reset if new day
        if (user.dailyActivity.date !== today) {
            user.dailyActivity = {
                date: today,
                runs: 0,
                submissions: 0
            };
            await user.save();
        }

        const limits = {
            free: { run: 2, submit: 1 },
            paid: { run: 4, submit: 1 },
            admin: { run: 9999, submit: 9999 } // Implicit unlimited
        };

        const roleLimits = limits[user.role] || limits.free;
        const currentUsage = user.dailyActivity[type === 'run' ? 'runs' : 'submissions'];
        const maxLimit = roleLimits[type];

        if (currentUsage >= maxLimit) {
            throw new Error(`Daily ${type} limit reached for ${user.role} user. (${currentUsage}/${maxLimit})`);
        }

        // Increment
        if (type === 'run') {
            user.dailyActivity.runs += 1;
        } else if (type === 'submit') {
            user.dailyActivity.submissions += 1;
        }

        await user.save();
    }
}

export default new UserService();
