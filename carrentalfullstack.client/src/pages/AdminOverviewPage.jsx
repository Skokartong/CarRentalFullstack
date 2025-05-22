import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/AdminOverviewPage.css';

export function AdminOverviewPage() {
    return (
        <div className="admin-container d-flex flex-column justify-content-center align-items-center" style={{ height: '90vh' }}>
            <h1 className="admin-title text-center mb-4">Hello, Admin</h1>

            <div className="row m-3 d-flex align-items-stretch">
                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center d-flex flex-column justify-content-center" style={{ height: '150px' }}>
                            <h5 className="card-title">Total Cars</h5>
                            <p className="display-6 mt-auto">25</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center d-flex flex-column justify-content-center" style={{ height: '150px' }}>
                            <h5 className="card-title">Active Rentals</h5>
                            <p className="display-6 mt-auto">7</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center d-flex flex-column justify-content-center" style={{ height: '150px' }}>
                            <h5 className="card-title">Registered Users</h5>
                            <p className="display-6 mt-auto">5</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex align-items-stretch">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center d-flex flex-column" style={{ height: '150px' }}>
                            <h5 className="card-title">Manage Cars</h5>
                            <Link to="/admin/cars" className="btn btn-primary mt-auto rounded-lg" style={{ borderRadius: '15px' }}>
                                Go to Cars
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-center d-flex flex-column" style={{ height: '150px' }}>
                            <h5 className="card-title">Manage Rentals</h5>
                            <Link to="/admin/rentals" className="btn btn-primary mt-auto rounded-lg" style={{ borderRadius: '15px' }}>
                                Go to Rentals
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
