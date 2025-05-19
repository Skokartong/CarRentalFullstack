import React from 'react';
import mazdaCx5 from '../assets/mazdacx5.jpg';
import landroverdefender from '../assets/landroverdefender.jpg';
import s90 from '../assets/s90red.jpg';
import volvov60 from '../assets/volvov60.jpg';
import volvoxc40 from '../assets/volvoxc40.jpg';
import wolkswagengolf from '../assets/wolkswagengolf.jpg';
import './styles/RentalDetailsCard.css';

const carImages = {
    'CX-5': mazdaCx5,
    'Defender': landroverdefender,
    's90': s90,
    'V60': volvov60,
    'XC40': volvoxc40,
    'Golf': wolkswagengolf,
};

const getCarImage = (model) => carImages[model] || null;

export const RentalDetailsCard = ({ rental, onEdit, onDelete }) => {
    if (!rental || !rental.car) return null;

    const { car, rentalStart, rentalEnd, price } = rental;
    const carImage = getCarImage(car.model);

    return (
        <div className="rental-details-card card shadow-lg">
            {carImage ? (
                <img className="card-img-top" src={carImage} alt={`${car.brand} ${car.model}`} />
            ) : (
                <div className="no-image text-center py-5 text-muted bg-light">
                    <em>No image available</em>
                </div>
            )}

            <div className="card-body">
                <h4 className="card-title">{car.brand} {car.model}</h4>
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item"><strong>Color:</strong> {car.colour}</li>
                    <li className="list-group-item"><strong>Year:</strong> {car.year}</li>
                    <li className="list-group-item"><strong>Rental Period:</strong><br /> {rentalStart} - {rentalEnd}</li>
                    <li className="list-group-item"><strong>Total Price:</strong> {price} SEK</li>
                </ul>

                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" style={{ borderRadius: '15px' }} onClick={onEdit}>Update</button>
                    <button className="btn btn-danger" style={{ borderRadius: '15px' }} onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

