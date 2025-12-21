'use client';

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="bg-card-dark p-5 rounded-xl border border-white/5 shadow-sm hover:border-primary/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-background-dark rounded-lg text-primary">
                        <span className="material-symbols-outlined">payments</span>
                    </div>
                    <span className="flex items-center text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                        +12.5%
                    </span>
                </div>
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <h3 className="text-2xl font-bold text-white mt-1">$124,592</h3>
            </div>

            {/* Stat 2 */}
            <div className="bg-card-dark p-5 rounded-xl border border-white/5 shadow-sm hover:border-primary/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-background-dark rounded-lg text-blue-400">
                        <span className="material-symbols-outlined">shopping_bag</span>
                    </div>
                    <span className="flex items-center text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                        +5.2%
                    </span>
                </div>
                <p className="text-gray-400 text-sm font-medium">Total Orders</p>
                <h3 className="text-2xl font-bold text-white mt-1">1,485</h3>
            </div>

            {/* Stat 3 */}
            <div className="bg-card-dark p-5 rounded-xl border border-white/5 shadow-sm hover:border-primary/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-background-dark rounded-lg text-purple-400">
                        <span className="material-symbols-outlined">group</span>
                    </div>
                    <span className="flex items-center text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                        +8.1%
                    </span>
                </div>
                <p className="text-gray-400 text-sm font-medium">Total Users</p>
                <h3 className="text-2xl font-bold text-white mt-1">3,203</h3>
            </div>

            {/* Stat 4 */}
            <div className="bg-card-dark p-5 rounded-xl border border-white/5 shadow-sm hover:border-red-500/30 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-background-dark rounded-lg text-red-500">
                        <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <span className="flex items-center text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm mr-1">priority_high</span>
                        Action Needed
                    </span>
                </div>
                <p className="text-gray-400 text-sm font-medium">Low Stock Items</p>
                <h3 className="text-2xl font-bold text-white mt-1">12</h3>
            </div>
        </div>
    );
}
