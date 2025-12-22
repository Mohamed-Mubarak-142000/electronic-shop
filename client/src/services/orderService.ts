import api from './api';

export const orderService = {
    async createOrder(data: any) {
        const response = await api.post('/orders', data);
        return response.data;
    },

    async getOrderById(id: string) {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    async getMyOrders() {
        const response = await api.get('/orders/myorders');
        return response.data;
    },

    async getOrders(params: any) {
        const response = await api.get('/orders', { params });
        return response.data;
    },

    async updateOrderToPaid(id: string, data: any) {
        const response = await api.put(`/orders/${id}/pay`, data);
        return response.data;
    },

    async updateOrderToDelivered(id: string) {
        const response = await api.put(`/orders/${id}/deliver`);
        return response.data;
    }
};
