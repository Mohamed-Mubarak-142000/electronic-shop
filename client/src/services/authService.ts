import api from './api';
import { useAuthStore } from '../store/useAuthStore';

export const authService = {
    async login(data: any) {
        const response = await api.post('/auth/login', data);
        if (response.data) {
            useAuthStore.getState().login(response.data);
        }
        return response.data;
    },

    async register(data: any) {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    logout() {
        useAuthStore.getState().logout();
    }
};
