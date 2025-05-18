import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRentalsByCustomerId } from '../services/rentalService';
import { getUserIdFromToken } from '../utils/jwt';
import { useNavigate } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
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
        <div className="active-rentals-container" style={{ borderRadius:'25px' }}>
            <h4>My Active Rentals</h4>
            {rentals.map((rental) => (
                <div
                    key={rental.id}
                    className="rental-card"
                    style={{ borderRadius: '25px' }}
                    onClick={() => navigate(`/rentals/${rental.id}`)}
                >
                    <div className="rental-info">
                        <strong>{rental.car.brand} {rental.car?.model}</strong>
                        <span>{rental.rentalStart} - {rental.rentalEnd}</span>
                        <span className="rental-price">
                            <FaCoins className="price-icon" />
                            <strong>{rental.price} SEK</strong>
                        </span>
                    </div>
                    <div className="rental-badge">View</div>
                </div>
            ))}
        </div>
    );
}
