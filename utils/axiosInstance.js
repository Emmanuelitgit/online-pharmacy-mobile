import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; 

const axiosInstance = axios.create({
    baseURL: 'https://pharmacy-ordering-server.onrender.com',
});

const refreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post('https://pharmacy-ordering-server.onrender.com/renew-token', {}, {
            headers: {
                authorization: `Bearer ${refreshToken}`,
            },
        });

        if (response.status === 200) {
            const { token } = response.data;
            await AsyncStorage.setItem('token', token);
            return token;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentDate = new Date();

            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const newToken = await refreshToken();
                config.headers['authorization'] = `Bearer ${newToken}`;
            } else {
                config.headers['authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token and if the request has not been retried
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshToken();

                // Retry the original request with the new token
                axios.defaults.headers.common['authorization'] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error('Error refreshing token:', err);
                // Redirect to login or show error message
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
