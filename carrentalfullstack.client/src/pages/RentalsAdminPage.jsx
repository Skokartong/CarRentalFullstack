import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllRentals, updateRental, deleteRental } from '../services/rentalService';
import { Modal, Button, Form } from 'react-bootstrap';
import './styles/RentalsAdminPage.css';

export function RentalsAdminPage() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentRental, setCurrentRental] = useState({
        id: '',
        rentalStart: '',
        rentalEnd: '',
        carId: '',
    });
    const { token } = useAuth();

    useEffect(() => {
        if (!token) return;
        const fetchRentals = async () => {
            try {
                const data = await getAllRentals(token);
                setRentals(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, [token]);

    const openEditModal = (rental) => {
        setCurrentRental({
            id: rental.id,
            rentalStart: rental.rentalStart?.slice(0, 10) || '',
            rentalEnd: rental.rentalEnd?.slice(0, 10) || '',
            carId: rental.car?.id || '',
        });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentRental((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (new Date(currentRental.rentalEnd) <= new Date(currentRental.rentalStart)) {
            alert('End date must be after start date');
            return;
        }

        try {
            const updatedRental = {
                RentalStart: currentRental.rentalStart,
                RentalEnd: currentRental.rentalEnd,
                FK_CarId: currentRental.carId,
            };

            await updateRental(currentRental.id, updatedRental, token);

            setRentals((prev) =>
                prev.map((r) =>
                    r.id === currentRental.id
                        ? { ...r, rentalStart: currentRental.rentalStart, rentalEnd: currentRental.rentalEnd }
                        : r
                )
            );

            setShowModal(false);
        } catch (err) {
            alert('Failed to update rental: ' + err.message);
        }
    };

    const handleDelete = async (rentalId) => {
        if (!window.confirm('Are you sure you want to delete this rental?')) return;
        try {
            await deleteRental(rentalId, token);
            setRentals((prev) => prev.filter((r) => r.id !== rentalId));
        } catch (err) {
            alert('Failed to delete rental: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status"></div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-4 py-3 d-flex flex-column">
            <h1 className="rental-admin-title mb-4 mt-2">Rentals Administration</h1>

            <table className="table table-striped" style={{ minWidth: '600px' }}>
                <thead>
                    <tr>
                        <th>Rental ID</th>
                        <th>Car</th>
                        <th>User</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((rental) => (
                        <tr key={rental.id}>
                            <td>{rental.id}</td>
                            <td>{rental.car?.model || '-'}</td>
                            <td>{rental.user? `${rental.user.firstname} ${rental.user.lastname}` : '-'}</td>
                            <td>{rental.rentalStart?.slice(0, 10)}</td>
                            <td>{rental.rentalEnd?.slice(0, 10)}</td>
                            <td>
                                <Button variant="primary" size="sm" className="me-2 rounded-lg" style={{ borderRadius: '15px' }} onClick={() => openEditModal(rental)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" className="rounded-lg" style={{ borderRadius: '15px' }} onClick={() => handleDelete(rental.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formRentalStart">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="rentalStart"
                                value={currentRental.rentalStart}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRentalEnd">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="rentalEnd"
                                value={currentRental.rentalEnd}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCarId">
                            <Form.Label>Car ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="carId"
                                value={currentRental.carId}
                                onChange={handleChange}
                                disabled 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="rounded-lg" style={{borderRadius:'15px'}} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="rounded-lg" style={{ borderRadius: '15px' }} onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
