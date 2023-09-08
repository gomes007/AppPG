import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:8080/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const user = await AsyncStorage.getItem('user');

            if (user) {
                const parsedUser = JSON.parse(user);
                const { token } = parsedUser;
                if (token) {
                    config.headers["Authorization"] = "Bearer " + token;
                }
            }
            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
