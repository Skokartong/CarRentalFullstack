import React, { useState } from 'react';
import { register } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

export const RegisterForm = () => {
    const { login } = useAuth();
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
            const token = response.token;
            login(token);

            alert('Registration successful!');
        } catch (err) {
            setError(err.message || 'Registration failed.');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Create a new account</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="d-flex justify-content-center">
                <form
                    className="row g-3"
                    onSubmit={handleSubmit}
                    style={{ maxWidth: '600px', width: '100%' }} 
                >
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-primary py-2"
                            style={{ maxWidth: '300px', width: '100%' }}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
