import React from 'react';

export const CarCard = ({ car }) => {
    return (
        <div className="car-card">
            <h3>{car.brand} {car.model}</h3>
            <p><strong>Color:</strong> {car.colour}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price per day:</strong> ${car.pricePerDay}</p>
            <p><strong>Price per hour:</strong> ${car.pricePerHour}</p>
        </div>
    );
}
