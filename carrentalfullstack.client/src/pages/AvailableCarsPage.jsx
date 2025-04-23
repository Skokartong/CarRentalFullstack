import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './AvailableCarsPage.css';
import { CarCard } from '../components/CarCard'; 
import { getAvailableCars } from '../services/rentalService';

export function AvailableCarsPage() {
    const [searchParams] = useSearchParams();
    const [availableCars, setAvailableCars] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            setError(null);

            try {
                const country = searchParams.get('country');
                const startDate = searchParams.get('startDate');
                const endDate = searchParams.get('endDate');

                if (!country || !startDate || !endDate) {
                    setError('Missing search parameters. Please go back and try again.');
                    return;
                }

                const cars = await getAvailableCars(country, startDate, endDate);

                if (Array.isArray(cars)) {
                    setAvailableCars(cars);
                } else {
                    setError('Unexpected response format from API');
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch available cars');
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [searchParams]);

    return (
        <div className="available-cars-page">
            <h2>Available Cars</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!error && !loading && availableCars.length === 0 && (
                <p>No available cars found for the selected criteria.</p>
            )}

            <div className="car-list">
                {availableCars.map((car) => (
                    <CarCard key={car.id} car={car} />  
                ))}
            </div>
        </div>
    );
}

