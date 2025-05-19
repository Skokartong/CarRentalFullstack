import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRentalsByCustomerId } from '../services/rentalService';
import { useAuth } from '../context/AuthContext';
import { getUserIdFromToken } from '../utils/jwt';
import { Button, Card, Alert, Spinner } from 'react-bootstrap';

export function RentalsPage() {
    const { token } = useAuth();
    const [rentals, setRentals] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userId = getUserIdFromToken(token); 

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const data = await getRentalsByCustomerId(userId, token);
                setRentals(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch rentals');
            } finally {
                setLoading(false);
            }
        };

        if (userId && token) fetchRentals();
    }, [token, userId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <Spinner animation="border" variant="primary" style={{ width: '5rem', height: '5rem' }} />
            </div>
        );
    }

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="container py-4">
            <h3 className="text-center mb-4">My Rentals</h3>
            {rentals.length === 0 ? (
                <Alert variant="info" className="text-center">You have no rentals yet.</Alert>
            ) : (
                <div className="row">
                    {rentals.map(rental => (
                        <div className="col-md-6 col-lg-4 mb-4" key={rental.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>{rental.car?.brand} {rental.car?.model}</Card.Title>
                                    <Card.Text>
                                        <strong>From:</strong> {rental.rentalStart}<br />
                                        <strong>To:</strong> {rental.rentalEnd}<br />
                                        <strong>Price:</strong> {rental.price} SEK
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        style={{ borderRadius: '12px' }}
                                        onClick={() => navigate(`/rentals/${rental.id}`)}
                                    >
                                        View
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
