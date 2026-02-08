import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../services/authApi';

const AuthContext = createContext(null);

// Daily limits by role
const DAILY_LIMITS = {
    free: { runs: 2, submissions: 1 },
    paid: { runs: 4, submissions: 1 },
    admin: { runs: 9999, submissions: 9999 }
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedUser = await authApi.getCurrentUser();
                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error('Auth init error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Login function - calls real API
    const login = async (credentials) => {
        try {
            const result = await authApi.login(credentials);
            setUser(result.user);
            // Also store in localStorage for quick access
            localStorage.setItem('qotd_user', JSON.stringify(result.user));
            return result;
        } catch (error) {
            throw error;
        }
    };

    // Register function - calls real API
    const register = async (credentials) => {
        try {
            const result = await authApi.register(credentials);
            setUser(result.user);
            localStorage.setItem('qotd_user', JSON.stringify(result.user));
            return result;
        } catch (error) {
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        authApi.logout();
        setUser(null);
    };

    // Update role
    const updateRole = async (newRole) => {
        try {
            const result = await authApi.updateRole(newRole);
            setUser(result.user);
            localStorage.setItem('qotd_user', JSON.stringify(result.user));
            return result;
        } catch (error) {
            throw error;
        }
    };

    // Get daily limits for current role
    const getDailyLimits = () => {
        const role = user?.role || 'free';
        return DAILY_LIMITS[role] || DAILY_LIMITS.free;
    };

    // Check if user can run code
    const canRun = () => {
        if (!user) return false;
        const limits = getDailyLimits();
        const used = user.dailyActivity?.runs || 0;
        return used < limits.runs;
    };

    // Check if user can submit
    const canSubmit = () => {
        if (!user) return false;
        const limits = getDailyLimits();
        const used = user.dailyActivity?.submissions || 0;
        return used < limits.submissions;
    };

    // Context value
    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
        role: user?.role || 'guest',
        login,
        register,
        logout,
        updateRole,
        getDailyLimits,
        canRun,
        canSubmit,
        isPaid: user?.role === 'paid' || user?.role === 'admin',
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
