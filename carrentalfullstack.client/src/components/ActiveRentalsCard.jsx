import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRentalsByCustomerId } from '../services/rentalService';
import { getUserIdFromToken } from '../utils/jwt';
import { useNavigate } from 'react-router-dom';
import './ActiveRentalsCard.css';

export function ActiveRentalsCard() {
    const { token } = useAuth();
    const [rentals, setRentals] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const userId = getUserIdFromToken(token);
                if (!userId) {
                    setError('User ID is missing');
                    return;
                }
                const data = await getRentalsByCustomerId(userId, token);
                setRentals(data);
            } catch (err) {
                setError('Failed to fetch your rentals');
                console.error(err);
            }
        };

        if (token) fetchRentals();
    }, [token]);

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!rentals.length) return <div className="alert alert-info">No active rentals found.</div>;

    return (
        <div className="active-rentals-container">
            <h4>My Active Rentals</h4>
            <ul className="list-group">
                {rentals.map((rental) => (
                    <li
                        key={rental.id}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        onClick={() => navigate(`/rentals/${rental.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div>
                            <strong>{rental.car?.brand} {rental.car?.model}</strong><br />
                            {new Date(rental.rentalStart).toLocaleDateString()} {new Date(rental.rentalEnd).toLocaleDateString()}
                        </div>
                        <span className="badge bg-primary rounded-pill">View</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
