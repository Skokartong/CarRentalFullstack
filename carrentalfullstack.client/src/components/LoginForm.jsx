import React, { useState } from 'react';
import './LoginForm.css';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login: setToken } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginDto = { username, password };
        try {
            const response = await login(loginDto, setToken);
            console.log('Login successful:', response);
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <section className="vh-90">
            <div className="container d-flex justify-content-center align-items-center h-100">
                <div className="row w-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-4 mx-auto">
                        <div className="card-container">
                        <h2 className="text-center text-black mb-4">Get going renting.</h2>
                        <form>
                            <div className="form-outline mb-2">
                                <input
                                    type="text"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter username"
                                />
                                <label className="form-label" htmlFor="form3Example3">
                                </label>
                            </div>

                            <div className="form-outline mb-2">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                />
                                <label className="form-label" htmlFor="form3Example4">
                                </label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        value=""
                                        id="form2Example3"
                                    />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">
                                    Forgot password?
                                </a>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-4 pt-2">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                >
                                    Login
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Not a member?{' '}
                                    <a href="#!" className="link-danger">
                                        Register
                                    </a>
                                </p>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

