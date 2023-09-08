import axiosInstance from './axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthService = {
    login: async function (username, password) {
        console.log('AuthService login method called');
        try {
            const response = await axiosInstance.post('authenticate', {
                username,
                password,
            });

            if (response.data.token) {
                await AsyncStorage.setItem('user', JSON.stringify(response.data));
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: async function () {
        try {
            await AsyncStorage.removeItem('user');
        } catch (error) {
            return Promise.reject(error);
        }
    },
    getCurrentUser: async function () {
        try {
            const user = await AsyncStorage.getItem('user');
            return JSON.parse(user);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default AuthService;
