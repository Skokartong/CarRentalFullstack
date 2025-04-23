import React, { useState } from 'react';
import { register } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { RegisterForm } from '../components/RegisterForm';
import { PitchCard } from '../components/PitchCard';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterPage.css';

export const RegisterPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        address: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        birthDate: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await register(formData);
            login(response.token);
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed.');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <PitchCard />
                <div className="col-12 col-md-6 py-5 d-flex align-items-center justify-content-center">
                    <RegisterForm
                        formData={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};


