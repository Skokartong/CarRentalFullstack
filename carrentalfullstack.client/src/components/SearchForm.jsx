import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchForm = ({
    country,
    startDate,
    endDate,
    error,
    onCountryChange,
    onStartDateChange,
    onEndDateChange,
    onSubmit
}) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!country || !startDate || !endDate) {
            alert("Please fill in all fields.");
            return;
        }

        navigate(`/available-cars?country=${country}&startDate=${startDate}&endDate=${endDate}`);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <select
                value={country}
                onChange={(e) => onCountryChange(e.target.value)}
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
                onChange={(e) => onStartDateChange(e.target.value)}
                required
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                required
            />

            <button type="submit">Search</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};
