import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Create a custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to provide the context
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);

    useEffect(() => {
    }, [token]);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
