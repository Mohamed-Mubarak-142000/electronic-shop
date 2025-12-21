import DashboardStats from '@/components/admin/DashboardStats';
import RevenueChart from '@/components/admin/RevenueChart';
import OrdersStatusChart from '@/components/admin/OrdersStatusChart';
import RecentOrders from '@/components/admin/RecentOrders';
import LowStockAlert from '@/components/admin/LowStockAlert';

export default function AdminDashboardPage() {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h2>
                    <p className="text-gray-400 mt-1">Here&apos;s what&apos;s happening with your store today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-card-dark border border-white/10 hover:bg-white/5 text-white rounded-lg text-sm font-medium transition-colors">
                        <span className="material-symbols-outlined text-lg">cloud_download</span>
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-green-400 text-background-dark rounded-lg text-sm font-bold transition-colors shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add Product
                    </button>
                </div>
            </div>

            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart />
                <OrdersStatusChart />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                <RecentOrders />
                <LowStockAlert />
            </div>
        </>
    );
}
