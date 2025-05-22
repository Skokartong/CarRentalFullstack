import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/LoginForm';
import { getUserRoleFromToken } from '../utils/jwt';
import './styles/LoginPage.css';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login: setToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login({ username, password }); 
            setToken(response.token); 
            console.log("Login successful", response);


            const roles = getUserRoleFromToken(response.token);

            if (roles.includes('admin')) {
                navigate('/admin');
            } else {
                navigate('/account');
            }

        } catch (err) {
            console.error("Login failed", err.message);
        }
    };

    return (
        <div className="login-container d-flex flex-column align-items-center justify-content-center" style={{ height: '90vh' }}>
        <LoginForm
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            />
        </div>
    );
};
