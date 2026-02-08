import bcrypt from 'bcrypt';

/**
 * In-Memory User Store
 * Fallback for when MongoDB is not available
 */

class InMemoryUserStore {
    constructor() {
        this.users = new Map();
        this.idCounter = 1;
    }

    /**
     * Find user by query (supports userId or email)
     */
    async findOne(query) {
        for (const user of this.users.values()) {
            if (query.userId && user.userId === query.userId) {
                return this._wrapUser(user);
            }
            if (query.email && user.email === query.email.toLowerCase()) {
                return this._wrapUser(user);
            }
        }
        return null;
    }

    /**
     * Find user by ID and include password
     */
    async findById(id) {
        const user = this.users.get(id);
        return user ? this._wrapUser(user, true) : null;
    }

    /**
     * Create a new user
     */
    async create(userData) {
        const id = String(this.idCounter++);

        // Hash password if provided
        let hashedPassword = userData.password;
        if (userData.password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(userData.password, salt);
        }

        const user = {
            _id: id,
            userId: userData.userId,
            email: userData.email?.toLowerCase(),
            password: hashedPassword,
            name: userData.name,
            role: userData.role || 'free',
            dailyActivity: userData.dailyActivity || {
                date: new Date().toISOString().split('T')[0],
                runs: 0,
                submissions: 0
            },
            createdAt: new Date()
        };

        this.users.set(id, user);
        return this._wrapUser(user);
    }

    /**
     * Wrap raw user data with model-like methods
     */
    _wrapUser(userData, includePassword = false) {
        const store = this;
        const user = { ...userData };

        // Remove password by default (like Mongoose select: false)
        if (!includePassword) {
            delete user.password;
        }

        return {
            ...user,

            async save() {
                store.users.set(this._id, {
                    _id: this._id,
                    userId: this.userId,
                    email: this.email,
                    password: store.users.get(this._id)?.password,
                    name: this.name,
                    role: this.role,
                    dailyActivity: this.dailyActivity,
                    createdAt: this.createdAt
                });
                return this;
            },

            async comparePassword(candidatePassword) {
                const storedUser = store.users.get(this._id);
                if (!storedUser || !storedUser.password) return false;
                return bcrypt.compare(candidatePassword, storedUser.password);
            },

            toPublicJSON() {
                return {
                    userId: this.userId,
                    email: this.email,
                    name: this.name,
                    role: this.role,
                    dailyActivity: this.dailyActivity,
                    createdAt: this.createdAt
                };
            }
        };
    }
}

// Singleton instance
const inMemoryStore = new InMemoryUserStore();

export default inMemoryStore;
