import axios from 'axios';

const API_BASE = '/api/cars';

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleError = (error) => {
    if (error.response) {
        throw new Error(error.response.data.error || 'Request failed');
    } else if (error.request) {
        throw new Error('No response from server');
    } else {
        throw new Error('Error in setting up the request');
    }
};

export async function getAllCars() {
    try {
        const response = await axiosInstance.get('/');
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getCarById(carId, token) {
    try {
        const response = await axiosInstance.get(`/${carId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getCarsByCountry(country, token) {
    try {
        const response = await axiosInstance.get(`/country/${country}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function addCar(car, token) {
    try {
        const response = await axiosInstance.post('/', car, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function updateCar(car, token) {
    try {
        const response = await axiosInstance.put('/', car, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteCar(carId, token) {
    try {
        const response = await axiosInstance.delete(`/${carId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}
