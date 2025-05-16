import React from 'react';
import './CarCard.css';

import mazdaCx5 from '../assets/mazdacx5.jpg';
import landroverdefender from '../assets/landroverdefender.jpg';
import s90 from '../assets/s90red.jpg';
import volvov60 from '../assets/volvov60.jpg';
import volvoxc40 from '../assets/volvoxc40.jpg';
import wolkswagengolf from '../assets/wolkswagengolf.jpg';

const carImages = {
    'CX-5': mazdaCx5,
    'Defender': landroverdefender,
    's90': s90,
    'V60': volvov60,
    'XC40': volvoxc40,
    'Golf': wolkswagengolf,
};

const getCarImage = (model) => carImages[model] || null;

export const CarCard = ({ car }) => {
    const carImage = getCarImage(car.model);

    return (
        <div className="car-card card shadow-lg mb-5">
            {carImage ? (
                <img className="card-img-top" src={carImage} alt={`${car.brand} ${car.model}`} />
            ) : (
                <div className="no-image text-center py-5 text-muted">
                    <em>No image available</em>
                </div>
            )}

            <div className="card-body">
                <h4 className="card-title mb-3">{car.brand} {car.model}</h4>

                <div className="info-pairs d-flex justify-content-between mb-2">
                    <span><strong>Color:</strong> {car.colour}</span>
                    <span><strong>Year:</strong> {car.year}</span>
                </div>

                <div className="info-pairs d-flex justify-content-between mb-4">
                    <span><strong>${car.pricePerDay}</strong>/Day</span>
                    <span><strong>${car.pricePerHour}</strong>/Hour</span>
                </div>

                <div className="text-center">
                    <a href="#" className="btn btn-primary btn-lg w-100">Book Now</a>
                </div>
            </div>
        </div>
    );
};
