import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { addRental } from '../services/rentalService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RentalFormModal = ({ show, handleClose, carId }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const rental = {
            FK_CarId: carId,
            RentalStart: new Date(startDateTime).toISOString(),
            RentalEnd: new Date(endDateTime).toISOString()
        };

        try {
            const result = await addRental(rental, token);
            setSuccess('Rental created successfully!');
            setTimeout(() => {
                handleClose();
                navigate(`/rentals/${result.id}`);
            }, 1200);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Book This Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="startDateTime" className="mb-3">
                        <Form.Label>Start Date & Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={startDateTime}
                            onChange={(e) => setStartDateTime(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="endDateTime" className="mb-3">
                        <Form.Label>End Date & Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={endDateTime}
                            onChange={(e) => setEndDateTime(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Booking...' : 'Book Now'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

