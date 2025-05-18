import React, { useEffect, useState } from 'react';
import { getAllCars } from '../services/carService';
import { useAuth } from '../context/AuthContext';
import { CarCard } from '../components/CarCard';
import { RentalFormModal } from '../components/RentalFormModal';
import { useNavigate } from 'react-router-dom';

export function CarBookingPage() {
    const { token } = useAuth();
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showModal, setShowModal] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await getAllCars(token);
                setCars(data);
                setFilteredCars(data);
            } catch (error) {
                console.error('Failed to fetch cars:', error.message);
            }
        };

        if (token) {
            fetchCars();
        }
    }, [token]);

    useEffect(() => {
        let result = [...cars];

        if (selectedCountry) {
            result = result.filter(car => car.country.toString() === selectedCountry);
        }

        if (sortOrder === 'asc') {
            result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        } else {
            result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        }

        setFilteredCars(result);
    }, [selectedCountry, sortOrder, cars]);

    const handleBook = (carId) => {
        if (!token) {
            setShowLoginAlert(true);
            setTimeout(() => navigate('/register'), 1500);
        } else {
            setSelectedCarId(carId);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCarId(null);
    };

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Book a Car</h2>

            {showLoginAlert && (
                <div className="alert alert-warning text-center position-fixed bottom-0 start-0 end-0 m-3 z-3">
                    Please register to book a car. Redirecting...
                </div>
            )}

            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="">All Countries</option>
                    <option value="0">Sweden</option>
                    <option value="1">France</option>
                    <option value="2">Germany</option>
                    <option value="3">Japan</option>
                    <option value="4">United States</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <div className="row">
                {filteredCars.map((car) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={car.id}>
                        <CarCard car={car} onBook={handleBook} />
                    </div>
                ))}
            </div>

            <RentalFormModal
                show={showModal}
                handleClose={closeModal}
                carId={selectedCarId}
            />
        </div>
    );
}


