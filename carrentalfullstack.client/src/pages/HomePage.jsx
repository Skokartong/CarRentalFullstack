import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import './HomePage.css';

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
            startDate: startDate,
            endDate: endDate,
        });

        try {
            const response = await fetch(`/api/rentals/available?${query.toString()}`);

            if (!response.ok) {
                const errorMsg = await response.text();
                setError(errorMsg);
                return;
            }

            const availableCars = await response.json();
            console.log('Available cars:', availableCars);

            navigate('/available-cars', { state: { availableCars } });
        } catch (err) {
            setError('Something went wrong. Please try again later.');
            console.error(err);
        }
    };

    return (
        <div className="homepage">
            <div className="overlay">
                <h1>POQ</h1>
                <p>Car rentals anytime, anywhere, globally.</p>

                <form className="search-form" onSubmit={handleSubmit}>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >
                        <option value="">Select Country</option>
                        <option value="SE">Sweden</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="JP">Japan</option>
                        <option value="US">United States</option>
                    </select>

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                    <button type="submit">Search</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
}

