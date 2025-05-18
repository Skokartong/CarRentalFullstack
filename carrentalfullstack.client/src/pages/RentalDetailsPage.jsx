import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRentalById, updateRental, deleteRental } from '../services/rentalService';
import { useAuth } from '../context/AuthContext';
import { RentalDetailsCard } from '../components/RentalDetailsCard';
import { Modal, Button, Alert } from 'react-bootstrap';

export function RentalDetailsPage() {
    const { rentalId } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [rental, setRental] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ rentalStart: '', rentalEnd: '' });

    useEffect(() => {
        const fetchRental = async () => {
            try {
                const data = await getRentalById(rentalId, token);
                setRental(data);
                setFormData({ rentalStart: data.rentalStart, rentalEnd: data.rentalEnd });
            } catch (err) {
                setError(err.message || 'Failed to fetch rental');
            }
        };
        if (token && rentalId) fetchRental();
    }, [rentalId, token]);

    const handleUpdate = async () => {
        try {
            await updateRental(rentalId, { ...rental, ...formData }, token);
            setShowModal(false);
            setSuccess('Rental details updated successfully.');
            const updated = await getRentalById(rentalId, token);
            setRental(updated);
        } catch (err) {
            setError(err.message || 'Failed to update rental');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRental(rentalId, token);
            setSuccess('Rental successfully deleted.');
            setTimeout(() => navigate('/rentals'), 1500);
        } catch (err) {
            setError(err.message || 'Failed to delete rental');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!rental) return <div className="alert alert-info">Loading rental details...</div>;

    return (
        <div
            className="position-relative"
            style={{
                height: '90vh',
                overflowY: 'auto',
            }}
        >
            <Button
                variant="primary"
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000,
                    borderRadius: '15px',
                }}
                onClick={() => navigate('/rentals')}
            >
                All Rentals
            </Button>

            <div className="container py-4 d-flex justify-content-center align-items-center">
                <div>
                    <h3 className="m-4 text-center">Rental Details</h3>

                    {success && <Alert variant="success">{success}</Alert>}

                    <RentalDetailsCard
                        rental={rental}
                        onEdit={() => setShowModal(true)}
                        onDelete={handleDelete}
                    />

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Rental</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Start Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        name="rentalStart"
                                        className="form-control"
                                        value={formData.rentalStart}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">End Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        name="rentalEnd"
                                        className="form-control"
                                        value={formData.rentalEnd}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" style={{borderRadius: '15px'}} onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" style={{ borderRadius: '15px' }} onClick={handleUpdate}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
