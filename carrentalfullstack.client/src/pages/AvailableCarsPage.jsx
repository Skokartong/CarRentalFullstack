import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AvailableCarsPage.css';

export function AvailableCarsPage() {
    const location = useLocation();
    const [availableCars, setAvailableCars] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location.state?.availableCars) {
            const cars = location.state.availableCars;
            console.log('Received available cars:', cars);

            if (Array.isArray(cars)) {
                setAvailableCars(cars);
            } else {
                setError('Data is not an array');
                console.error('Expected an array but got:', cars);
            }
        } else {
            setError('No car data provided. Please go back and search again.');
        }
    }, [location.state]);

    return (
        <div className="available-cars-page">
            <h2>Available Cars</h2>
            {error && <p className="error-message">{error}</p>}
            {!error && availableCars.length === 0 && <p>No available cars found.</p>}

            <div className="car-list">
                {availableCars.length > 0 &&
                    availableCars.map((car) => (
                        <div key={car.id} className="car-card">
                            <h3>{car.brand} {car.model}</h3>
                            <p><strong>Color:</strong> {car.colour}</p>
                            <p><strong>Year:</strong> {car.year}</p>
                            <p><strong>Price per day:</strong> ${car.pricePerDay}</p>
                            <p><strong>Price per hour:</strong> ${car.pricePerHour}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
}
