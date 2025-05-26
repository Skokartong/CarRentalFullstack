import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableCars } from '../services/rentalService';
import { SearchForm } from '../components/SearchForm';
import { Footer } from '../components/Footer';
import './styles/HomePage.css';

export function HomePage() {
    const navigate = useNavigate();
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const query = new URLSearchParams({
            country: country,
            startDate: rentalStartDate,
            endDate: rentalEndDate,
        });

        try {
            const availableCars = await getAvailableCars(country, startDate, endDate);
            console.log('Available cars:', availableCars);
            navigate('/available-cars', {
                state: {
                    availableCars,
                    country,
                    startDate,
                    endDate
                }
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="home-container d-flex flex-column align-items-center justify-content-center" style={{ height: '90vh' }}>
            <div className="overlay">
                <h1 class="h1-tag">POQ</h1>
                <p>Car rentals <span>anytime, anywhere, globally.</span></p>

                <SearchForm
                    country={country}
                    startDate={startDate}
                    endDate={endDate}
                    error={error}
                    onCountryChange={setCountry}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    onSubmit={handleSubmit}
                />
            </div>
            <Footer></Footer>
        </div>
    );
}

