/**
 * Auth API Service
 * Handles all authentication-related API calls
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

/**
 * Get auth token from localStorage
 */
export const getToken = () => {
    return localStorage.getItem('qotd_token');
};

/**
 * Set auth token in localStorage
 */
export const setToken = (token) => {
    localStorage.setItem('qotd_token', token);
};

/**
 * Remove auth token from localStorage
 */
export const removeToken = () => {
    localStorage.removeItem('qotd_token');
    localStorage.removeItem('qotd_user');
};

/**
 * Get auth headers for API requests
 */
export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Register a new user
 * @param {Object} data - { email, password, name, role }
 * @returns {Promise<Object>} - { token, user }
 */
export const register = async (data) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
    }

    // Store token
    if (result.token) {
        setToken(result.token);
    }

    return result;
};

/**
 * Login user
 * @param {Object} data - { email, password, role }
 * @returns {Promise<Object>} - { token, user }
 */
export const login = async (data) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Login failed');
    }

    // Store token
    if (result.token) {
        setToken(result.token);
    }

    return result;
};

/**
 * Get current user profile
 * @returns {Promise<Object>} - { user }
 */
export const getCurrentUser = async () => {
    const token = getToken();

    if (!token) {
        return null;
    }

    const response = await fetch(`${API_BASE}/auth/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
    });

    if (!response.ok) {
        // Token invalid or expired
        if (response.status === 401) {
            removeToken();
            return null;
        }
        return null;
    }

    const result = await response.json();
    return result.user;
};

/**
 * Update user role
 * @param {string} role - 'free', 'paid', or 'admin'
 * @returns {Promise<Object>} - { user }
 */
export const updateRole = async (role) => {
    const response = await fetch(`${API_BASE}/auth/role`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ role }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Failed to update role');
    }

    return result;
};

/**
 * Logout user
 */
export const logout = () => {
    removeToken();
};
