import axios from 'axios';

const axiosInstance = axios.create({
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

export async function getAllCars(token) {
    try {
        const response = await axiosInstance.get('/api/cars', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export async function getCarById(carId, token) {
    try {
        const response = await axiosInstance.get(`/api/cars/${carId}`, {
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
        const response = await axiosInstance.get(`/api/cars/country/${country}`, {
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
        const response = await axiosInstance.post('/api/cars', car, {
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
        const response = await axiosInstance.put('/api/cars', car, {
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
        const response = await axiosInstance.delete(`/api/cars/${carId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}
