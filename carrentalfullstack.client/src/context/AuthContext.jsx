import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken', token);
        }
    }, [token]);

    const login = (token) => {
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

