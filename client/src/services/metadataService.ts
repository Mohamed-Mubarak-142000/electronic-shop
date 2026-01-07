import api from './api';

export const categoryService = {
    async getCategories() {
        const response = await api.get('/categories');
        return response.data;
    },

    async getCategory(id: string) {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    async createCategory(data: Record<string, unknown>) {
        const response = await api.post('/categories', data);
        return response.data;
    },

    async updateCategory(id: string, data: Record<string, unknown>) {
        const response = await api.put(`/categories/${id}`, data);
        return response.data;
    },

    async deleteCategory(id: string) {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    },

    async getCategoryStats() {
        const response = await api.get('/dashboard/categories/stats');
        return response.data;
    }
};

export const brandService = {
    async getBrands() {
        const response = await api.get('/brands');
        return response.data;
    },

    async getBrand(id: string) {
        const response = await api.get(`/brands/${id}`);
        return response.data;
    },

    async createBrand(data: Record<string, unknown>) {
        const response = await api.post('/brands', data);
        return response.data;
    },

    async updateBrand(id: string, data: Record<string, unknown>) {
        const response = await api.put(`/brands/${id}`, data);
        return response.data;
    },

    async deleteBrand(id: string) {
        const response = await api.delete(`/brands/${id}`);
        return response.data;
    },

    async getBrandStats() {
        const response = await api.get('/dashboard/brands/stats');
        return response.data;
    }
};
