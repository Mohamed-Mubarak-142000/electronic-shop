import api from './api';

export interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalCategories: number;
    totalBrands: number;
    totalRevenue: number;
    lowStockCount: number;
    trends: {
        revenue: number;
        orders: number;
        users: number;
    };
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const { data } = await api.get('/dashboard/stats');
    return data;
};

const dashboardService = {
    getDashboardStats,
};

export default dashboardService;
