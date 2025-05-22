import React, { useEffect, useState } from 'react';
import { getAllCars, addCar, updateCar, deleteCar } from '../services/carService';
import { useAuth } from '../context/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap';
import './styles/CarAdminPage.css';

export function CarAdminPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentCar, setCurrentCar] = useState({
        id: '',
        model: '',
        brand: '',
        year: '',
        pricePerDay: '',
        pricePerHour: '',
    });

    useEffect(() => {
        if (!token) return;

        const fetchCars = async () => {
            try {
                const data = await getAllCars(token);
                setCars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [token]);

    const openAddModal = () => {
        setModalMode('add');
        setCurrentCar({
            id: '',
            model: '',
            brand: '',
            year: '',
            pricePerDay: '',
            pricePerHour: '',
        });
        setShowModal(true);
    };

    const openEditModal = (car) => {
        setModalMode('edit');
        setCurrentCar({ ...car });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCar((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            if (modalMode === 'add') {
                await addCar(currentCar, token);
            } else {
                await updateCar(currentCar, token);
            }
            const data = await getAllCars(token);
            setCars(data);
            setShowModal(false);
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const handleDelete = async (carId) => {
        if (!window.confirm('Are you sure you want to delete this car?')) return;

        try {
            await deleteCar(carId, token);
            setCars((prev) => prev.filter((car) => car.id !== carId));
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status"></div>
            </div>
        );
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-4 py-3">
            <div className="d-flex justify-content-between align-items-center py-3 mb-3">
                <h1 className="car-admin-title">Car Administration</h1>
                <Button variant="primary" className="rounded-lg" style={{ borderRadius: '15px' }} onClick={openAddModal}>
                    Add New Car
                </Button>
            </div>

            <div style={{ width: '90vw', maxWidth: '100%', margin: '0 auto', overflowX: 'auto' }}>
                <table className="table table-striped" style={{ minWidth: '600px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Model</th>
                            <th>Brand</th>
                            <th>Year</th>
                            <th>Price/Day</th>
                            <th>Price/Hour</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.model}</td>
                                <td>{car.brand}</td>
                                <td>{car.year}</td>
                                <td>{car.pricePerDay}</td>
                                <td>{car.pricePerHour}</td>
                                <td>
                                    <Button variant="primary" size="sm" className="me-2 rounded-lg" style={{ borderRadius: '15px' }} onClick={() => openEditModal(car)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" size="sm" className="rounded-lg" style={{ borderRadius: '15px' }} onClick={() => handleDelete(car.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalMode === 'add' ? 'Add New Car' : 'Edit Car'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formModel">
                                <Form.Label>Model</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="model"
                                    value={currentCar.model}
                                    onChange={handleChange}
                                    placeholder="Enter model"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBrand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="brand"
                                    value={currentCar.brand}
                                    onChange={handleChange}
                                    placeholder="Enter brand"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="year"
                                    value={currentCar.year}
                                    onChange={handleChange}
                                    placeholder="Enter year"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPricePerDay">
                                <Form.Label>Price per Day</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="pricePerDay"
                                    value={currentCar.pricePerDay}
                                    onChange={handleChange}
                                    placeholder="Price per day"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPricePerHour">
                                <Form.Label>Price per Hour</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="pricePerHour"
                                    value={currentCar.pricePerHour}
                                    onChange={handleChange}
                                    placeholder="Price per hour"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
