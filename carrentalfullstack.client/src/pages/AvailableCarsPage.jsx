import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './styles/AvailableCarsPage.css';
import { CarCard } from '../components/CarCard';
import { getAvailableCars } from '../services/rentalService';
import { useAuth } from '../context/AuthContext';
import { addRental } from '../services/rentalService';

export function AvailableCarsPage() {
    const [searchParams] = useSearchParams();
    const [availableCars, setAvailableCars] = useState([]);
    const [sortedCars, setSortedCars] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, token } = useAuth();
    const navigate = useNavigate();

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
                    setSortedCars(cars);
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

    useEffect(() => {
        let sorted = [...availableCars];
        if (sortBy === 'pricePerDay') {
            sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
        } else if (sortBy === 'pricePerHour') {
            sorted.sort((a, b) => a.pricePerHour - b.pricePerHour);
        }
        setSortedCars(sorted);
    }, [sortBy, availableCars]);

    const handleBook = async (carId) => {
        if (!user) {
            navigate('/register');
            return;
        }

        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        if (!startDate || !endDate) {
            alert('Missing start or end date');
            return;
        }

        const rental = {
            userId: user.id,
            carId: carId,
            rentalStartDate: startDate,
            rentalEndDate: endDate
        };

        try {
            const newRental = await addRental(rental, token);

            console.log('newRental', newRental);

            navigate(`/rentals/${newRental.id}`);
        } catch (err) {
            alert(err.message || 'Failed to book rental');
        }
    };

    return (
        <div className="available-cars-page">
            <div className="header-section d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Available Cars</h2>
                <div className="filter-dropdown">
                    <select
                        onChange={(e) => setSortBy(e.target.value)}
                        value={sortBy}
                        className="form-select"
                    >
                        <option value="">Filter</option>
                        <option value="pricePerDay">Price per Day</option>
                        <option value="pricePerHour">Price per Hour</option>
                    </select>
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!error && !loading && sortedCars.length === 0 && (
                <p>No available cars found for the selected criteria.</p>
            )}

            <div className="car-list">
                {sortedCars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        onBook={() => handleBook(car.id)}
                        showRegisterBanner={!user}
                    />
                ))}
            </div>
        </div>
    );
}

