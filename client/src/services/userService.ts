import api from './api';

export const userService = {
    async getUsers(params: any) {
        const response = await api.get('/users', { params });
        return response.data;
    },

    async getUser(id: string) {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    async updateUser(id: string, data: any) {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    },

    async deleteUser(id: string) {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    }
};
