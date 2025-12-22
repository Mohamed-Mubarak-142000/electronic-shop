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
        // Note: Register currently doesn't login automatically/return token in my backend impl (requires verification maybe?)
        // Backend says: "Registration successful. Please verify OTP." or similar in future.
        // For now, if it returns user/token we can login, otherwise just return data.
        // My backend impl for register returns { _id, name, email, role, message } but NO token yet.
        return response.data;
    },

    logout() {
        useAuthStore.getState().logout();
    }
};
