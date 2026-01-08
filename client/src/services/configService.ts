import api from './api';

export const configService = {
    async getConfigs() {
        const response = await api.get('/config');
        return response.data;
    },

    async updateConfigs(data: Record<string, any>) {
        const response = await api.post('/config', data);
        return response.data;
    }
};
