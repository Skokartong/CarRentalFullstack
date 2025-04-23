import axios from 'axios';

const API_BASE = '/api/auth';

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export async function login(loginDto) {
    try {
        const response = await axiosInstance.post('/login', loginDto);
        return response.data; 
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Invalid login credentials');
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error('Error in setting up the login request');
        }
    }
}

export async function register(registerDto) {
    try {
        const response = await axiosInstance.post('/register', registerDto);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Registration failed');
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error('Error in setting up the registration request');
        }
    }
}


