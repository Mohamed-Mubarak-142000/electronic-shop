import api from './api';

export const portfolioService = {
    async getPortfolios() {
        const response = await api.get('/portfolio');
        return response.data;
    },

    async getPortfolioById(id: string) {
        const response = await api.get(`/portfolio/${id}`);
        return response.data;
    },

    async createPortfolio(data: any) {
        const response = await api.post('/portfolio', data);
        return response.data;
    },

    async updatePortfolio(id: string, data: any) {
        const response = await api.put(`/portfolio/${id}`, data);
        return response.data;
    },

    async deletePortfolio(id: string) {
        const response = await api.delete(`/portfolio/${id}`);
        return response.data;
    },

    async getOwnerPortfolio() {
        const response = await api.get('/portfolio/owner');
        return response.data;
    }
};
