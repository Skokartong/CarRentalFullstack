import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE = '/api/rentals';

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function getAllRentals(token) {
    const { token } = useAuth();
    try {
        const response = await axiosInstance.get('/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to fetch rentals');
        }
        throw new Error('No response from server');
    }
}

export async function getRentalById(rentalId, token) {
    const { token } = useAuth();
    try {
        const response = await axiosInstance.get(`/${rentalId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Rental not found');
        }
        throw new Error('No response from server');
    }
}

export async function addRental(rental, token) {
    const { token } = useAuth();
    try {
        const response = await axiosInstance.post('/', rental, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to add rental');
        }
        throw new Error('No response from server');
    }
}

export async function getRentalsByCountry(country, token) {
    const { token } = useAuth();
    try {
        const response = await axiosInstance.get(`/country/${country}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to fetch rentals by country');
        }
        throw new Error('No response from server');
    }
}

export async function getRentalsByCarId(carId, token) {
    const { token } = useAuth();
    try {
        const response = await axiosInstance.get(`/cars/${carId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to fetch rentals by car ID');
        }
        throw new Error('No response from server');
    }
}

export async function updateRental(rentalId, rental, token) {
    const { token } = useAuth();
    try {
        const response = await axiosInstance.put('/', rental, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                rentalId: rentalId,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to update rental');
        }
        throw new Error('No response from server');
    }
}

export async function getRentalsByCustomerId(userId, token) {
    const { token } = useAuth();
    try {
        const response = await axiosInstance.get(`/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to fetch rentals by user ID');
        }
        throw new Error('No response from server');
    }
}

export async function deleteRental(rentalId, token) {
    const { token } = useAuth();
    try {
        const response = await axiosInstance.delete(`/${rentalId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to delete rental');
        }
        throw new Error('No response from server');
    }
}
