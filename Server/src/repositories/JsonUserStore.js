import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.resolve('data/users.json');

/**
 * JSON-based User Store
 * Persists user data to users.json file
 */
class JsonUserStore {
    constructor() {
        this.idCounter = 1;
    }

    /**
     * Read users from JSON file
     */
    async _readData() {
        try {
            const data = await fs.readFile(DATA_PATH, 'utf-8');
            const users = JSON.parse(data);
            // Update ID counter to be higher than any existing ID
            if (users.length > 0) {
                const maxId = Math.max(...users.map(u => parseInt(u._id) || 0));
                this.idCounter = maxId + 1;
            }
            return users;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            console.error('Error reading users.json:', error);
            return [];
        }
    }

    /**
     * Write users to JSON file
     */
    async _writeData(users) {
        try {
            await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error writing users.json:', error);
            throw error;
        }
    }

    /**
     * Find user by query (supports userId or email)
     */
    async findOne(query) {
        const users = await this._readData();
        for (const user of users) {
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
        const users = await this._readData();
        const user = users.find(u => u._id === id);
        return user ? this._wrapUser(user, true) : null;
    }

    /**
     * Create a new user
     */
    async create(userData) {
        const users = await this._readData();
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
            createdAt: new Date().toISOString()
        };

        users.push(user);
        await this._writeData(users);

        return this._wrapUser(user);
    }

    /**
     * Update a user in the JSON file
     */
    async _updateUser(userId, updates) {
        const users = await this._readData();
        const index = users.findIndex(u => u._id === userId || u.userId === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates };
            await this._writeData(users);
            return users[index];
        }
        return null;
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
                await store._updateUser(this._id, {
                    userId: this.userId,
                    email: this.email,
                    name: this.name,
                    role: this.role,
                    dailyActivity: this.dailyActivity
                });
                return this;
            },

            async comparePassword(candidatePassword) {
                const users = await store._readData();
                const storedUser = users.find(u => u._id === this._id);
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
const jsonUserStore = new JsonUserStore();

export default jsonUserStore;
