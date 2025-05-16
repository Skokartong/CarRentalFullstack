import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const RegisterForm = ({ formData, onChange, onSubmit, error }) => {
    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Create a new account</h2>
            {error && <p className="alert alert-danger">{error}</p>}
            <div className="d-flex justify-content-center">
                <form
                    className="row g-3"
                    onSubmit={onSubmit}
                    style={{ maxWidth: '500px', width: '100%' }}
                >
                    {[
                        { name: 'username', placeholder: 'Username', type: 'text' },
                        { name: 'password', placeholder: 'Password', type: 'password' },
                        { name: 'email', placeholder: 'Email', type: 'email' },
                        { name: 'firstname', placeholder: 'First Name', type: 'text' },
                        { name: 'lastname', placeholder: 'Last Name', type: 'text' },
                        { name: 'address', placeholder: 'Address', type: 'text' },
                        { name: 'postalCode', placeholder: 'Postal Code', type: 'text' },
                        { name: 'city', placeholder: 'City', type: 'text' },
                        { name: 'country', placeholder: 'Country', type: 'text' },
                        { name: 'phone', placeholder: 'Phone', type: 'text' },
                        { name: 'birthDate', placeholder: '', type: 'date' },
                    ].map((input, i) => (
                        <div className="col-12 col-md-6" key={i}>
                            <input
                                type={input.type}
                                name={input.name}
                                placeholder={input.placeholder}
                                value={formData[input.name]}
                                onChange={onChange}
                                className="form-control"
                                required
                            />
                        </div>
                    ))}
                    <div className="col-12 d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-primary py-2 rounded-lg"
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
