import axios from 'axios';
import { useAuth } from '../context/AuthContext';


const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function getAvailableCars(country, startDate, endDate) {
    try {
        const response = await axios.get('/api/rentals/available', {
            params: {
                country,
                startDate,
                endDate,
            },
        });

        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.error || 'Failed to fetch available cars';
        throw new Error(errorMsg);
    }
}

export async function getAllRentals(token) {
    try {
        const response = await axiosInstance.get('/api/rentals', {
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
    try {
        const response = await axiosInstance.get(`/api/rentals/${rentalId}`, {
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
    try {
        const response = await axiosInstance.get(`/api/rentals/country/${country}`, {
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
    try {
        const response = await axiosInstance.get(`/api/rentals/cars/${carId}`, {
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
    try {
        const response = await axiosInstance.put('/api/rentals', rental, {
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
    try {
        const response = await axiosInstance.get(`api/rentals/user/${userId}`, {
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
    try {
        const response = await axiosInstance.delete(`/api/rentals/${rentalId}`, {
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
