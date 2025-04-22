import React from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegisterPage.css';


export const RegisterPage = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-6 py-5 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundImage: 'url("src/assets/roadtrip.jpg")', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="text-container">
                        <h2 className="mb-4">Why join POQ?</h2>
                        <div className="d-flex flex-column align-items-start">
                            <div className="d-flex align-items-center mb-3">
                                <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                                <p className="mb-0">Rent cars anywhere in the world</p>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                                <p className="mb-0">Access a wide range of vehicles</p>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                                <p className="mb-0">Get amazing offers and discounts</p>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <FaCheckCircle size={24} className="me-2" style={{ color: '#3d87f1' }} />
                                <p className="mb-0">24/7 customer support</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 py-5 d-flex align-items-center justify-content-center">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};


