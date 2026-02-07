import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('techlearn_user');
            return stored ? JSON.parse(stored) : { userId: 'test-user-1', role: 'free' };
        } catch {
            return { userId: 'test-user-1', role: 'free' };
        }
    });

    const updateUser = (id, role) => {
        const newUser = { userId: id, role };
        setUser(newUser);
        localStorage.setItem('techlearn_user', JSON.stringify(newUser));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
    return useContext(UserContext);
}
