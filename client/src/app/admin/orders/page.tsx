import Link from 'next/link';
import OrdersTable from '@/components/admin/OrdersTable';
import OrderDetailsDrawer from '@/components/admin/OrderDetailsDrawer';

export default function OrdersPage() {
    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            {/* Header & Toolbar */}
            <header className="bg-background-dark border-b border-white/5 py-5 px-8 flex flex-col gap-6 sticky top-0 z-10">
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div>
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.02em]">Orders Management</h2>
                        <p className="text-gray-400 text-sm mt-1">Track and manage customer orders and shipments.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-surface-dark border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-all">
                            <span className="material-symbols-outlined text-[20px] mr-2">cloud_download</span>
                            Export CSV
                        </button>
                        <button className="flex cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-primary text-black text-sm font-bold hover:bg-[#2dc268] transition-all shadow-[0_0_20px_rgba(54,226,123,0.2)]">
                            <span className="material-symbols-outlined text-[20px] mr-2">add</span>
                            Create Order
                        </button>
                    </div>
                </div>
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1 rounded-2xl p-4 bg-surface-dark border border-white/5 hover:border-primary/30 transition-colors">
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Orders</p>
                        <div className="flex items-end justify-between">
                            <p className="text-white text-2xl font-bold">1,240</p>
                            <span className="text-[#0bda43] text-xs font-bold bg-[#0bda43]/10 px-2 py-1 rounded-full flex items-center"><span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>+12%</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl p-4 bg-surface-dark border border-white/5 hover:border-primary/30 transition-colors">
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Pending Shipment</p>
                        <div className="flex items-end justify-between">
                            <p className="text-white text-2xl font-bold">45</p>
                            <span className="text-[#0bda43] text-xs font-bold bg-[#0bda43]/10 px-2 py-1 rounded-full flex items-center"><span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>+5%</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl p-4 bg-surface-dark border border-white/5 hover:border-primary/30 transition-colors">
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Returns</p>
                        <div className="flex items-end justify-between">
                            <p className="text-white text-2xl font-bold">12</p>
                            <span className="text-[#fa5538] text-xs font-bold bg-[#fa5538]/10 px-2 py-1 rounded-full flex items-center"><span className="material-symbols-outlined text-[14px] mr-0.5">trending_down</span>-2%</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 rounded-2xl p-4 bg-surface-dark border border-white/5 hover:border-primary/30 transition-colors">
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Avg Order Value</p>
                        <div className="flex items-end justify-between">
                            <p className="text-white text-2xl font-bold">$350.00</p>
                            <span className="text-[#0bda43] text-xs font-bold bg-[#0bda43]/10 px-2 py-1 rounded-full flex items-center"><span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>+8%</span>
                        </div>
                    </div>
                </div>
                {/* Search & Filters */}
                <div className="flex gap-4 items-center">
                    <label className="flex-1 relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
                        </div>
                        <input
                            className="block w-full pl-12 pr-4 py-3 bg-[#254632]/50 border border-transparent focus:border-primary/50 text-white placeholder-gray-400 rounded-xl focus:ring-0 focus:bg-[#254632] transition-all"
                            placeholder="Search by Order ID, Customer Name or Product..."
                            type="text"
                        />
                    </label>
                    <button className="flex-shrink-0 flex items-center justify-center h-[50px] px-5 rounded-xl bg-[#254632]/50 hover:bg-[#254632] text-white font-bold transition-all border border-transparent hover:border-primary/30 gap-2">
                        <span className="material-symbols-outlined">filter_list</span>
                        <span>Filter</span>
                    </button>
                    <button className="flex-shrink-0 flex items-center justify-center h-[50px] w-[50px] rounded-xl bg-[#254632]/50 hover:bg-[#254632] text-white font-bold transition-all border border-transparent hover:border-primary/30">
                        <span className="material-symbols-outlined">refresh</span>
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                <OrdersTable />
            </div>

            <OrderDetailsDrawer />
        </div>
    );
}
