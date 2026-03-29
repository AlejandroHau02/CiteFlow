import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
};

// credenciales de admin (en prod es backend)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //verificar si hay sesión guardada
    useEffect(() => {
        const saved = localStorage.getItem('citeflow_auth');
        if (saved === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);

    const login = (username, password) => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            setIsAuthenticated(true);
            localStorage.setItem('citeflow_auth', 'true');
            return { success: true };
        }
        return { success: false, error: 'Credenciales inválidas' }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('citeflow_auth');
    };

    const value = {
        isAuthenticated,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};