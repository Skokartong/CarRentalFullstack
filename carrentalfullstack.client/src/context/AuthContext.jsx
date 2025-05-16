import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccount } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('authToken', token);
            fetchUserData();
        } else {
            setUser(null);
        }
    }, [token]);

    const fetchUserData = async () => {
        try {
            const accountData = await getAccount(); 
            setUser(accountData); 
        } catch (error) {
            console.error('Error fetching account data', error);
            setUser(null); 
        }
    };

    const login = (token, userData) => {
        setToken(token);
        setUser(userData); 
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null); 
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
