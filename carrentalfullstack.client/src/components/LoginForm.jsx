import React from 'react';
import './styles/LoginForm.css';
import { Link } from 'react-router-dom';

export const LoginForm = ({ username, password, onUsernameChange, onPasswordChange, onSubmit }) => {
    return (
        <div className="card-container" style={{ borderRadius: '15px' }}>
            <h2 className="text-center mb-4">Get going renting.</h2>
            <form onSubmit={onSubmit}>
                <div className="form-outline mb-2">
                    <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => onUsernameChange(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example3"></label>
                </div>

                <div className="form-outline mb-2">
                    <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form3Example4"></label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check mb-0">
                        <input
                            className="form-check-input me-2"
                            type="checkbox"
                            id="form2Example3"
                        />
                        <label className="form-check-label" htmlFor="form2Example3">
                            Remember me
                        </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2 pt-2">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg rounded-lg"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', borderRadius: '15px' }}
                    >
                        Login
                    </button>
                    <p className="medium fw-bold mt-2 mb-0">
                        <Link to="/register" className="link-danger">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};


