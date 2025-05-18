import React, { useState } from 'react';
import { FaCoins } from 'react-icons/fa';
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

export const CarCard = ({ car, onBook, showRegisterBanner }) => {
    const carImage = getCarImage(car.model);
    const [showAlert, setShowAlert] = useState(false);

    const handleBookClick = () => {
        if (showRegisterBanner) {
            setShowAlert(true); 
        } else {
            onBook();
        }
    };

    return (
        <div className="car-card card shadow-lg mb-5" style={{ borderRadius: '15px' }}>
            {carImage ? (
                <img className="card-img-top" src={carImage} alt={`${car.brand} ${car.model}`} />
            ) : (
                <div>
                    <img className="card-img-top" src={s90} alt={`${car.brand} ${car.model}`} />
                </div>
            )}

            <div className="card-body">
                <h4 className="card-title mb-3">{car.brand} {car.model}</h4>

                <div className="info-pairs d-flex justify-content-between mb-2">
                    <span><strong>Color:</strong> {car.colour}</span>
                    <span><strong>Year:</strong> {car.year}</span>
                </div>

                <div className="info-pairs d-flex justify-content-between mb-4">
                    <span><FaCoins className="price-icon" /><strong>{car.pricePerDay} SEK</strong>/Day</span>
                    <span><FaCoins className="price-icon" /><strong>{car.pricePerHour} SEK</strong>/Hour</span>
                </div>

                <div className="text-center">
                    {showAlert && (
                        <div className="alert alert-warning m-3" role="alert">
                            <strong>To book a car: </strong> <a href="/register" className="alert-link">register here</a>.
                        </div>
                    )}

                    <button className="btn btn-primary btn-lg w-100" onClick={() => onBook(car.id)}>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};
