import Link from 'next/link';
import ProductsTable from '@/components/admin/ProductsTable';

export default function ProductsPage() {
    return (
        <>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors font-medium">Dashboard</Link>
                <span className="text-gray-400">/</span>
                <span className="text-white font-medium">Products</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-white text-3xl font-bold tracking-tight">Products Inventory</h2>
                    <p className="text-gray-400 mt-1">Manage your product catalog, prices, and stock levels.</p>
                </div>
                <Link href="/admin/products/create">
                    <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary hover:bg-green-400 text-background-dark text-sm font-bold transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span>Add Product</span>
                    </button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 rounded-xl p-5 border border-white/10 bg-surface-dark shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">Total Products</p>
                        <span className="material-symbols-outlined text-primary">inventory</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-white text-2xl font-bold">1,240</p>
                        <p className="text-primary text-xs font-medium bg-primary/10 px-2 py-0.5 rounded-full">+12%</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-5 border border-white/10 bg-surface-dark shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">Low Stock Alerts</p>
                        <span className="material-symbols-outlined text-orange-400">warning</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-white text-2xl font-bold">15</p>
                        <p className="text-orange-400 text-xs font-medium bg-orange-400/10 px-2 py-0.5 rounded-full">+2 new</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-5 border border-white/10 bg-surface-dark shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">Inventory Value</p>
                        <span className="material-symbols-outlined text-primary">attach_money</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-white text-2xl font-bold">$450.2k</p>
                        <p className="text-primary text-xs font-medium bg-primary/10 px-2 py-0.5 rounded-full">+5%</p>
                    </div>
                </div>
            </div>

            {/* Filters & Search Toolbar */}
            <div className="flex flex-col lg:flex-row gap-4 p-4 rounded-xl border border-white/10 bg-surface-dark items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative w-full lg:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-gray-400">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-background-dark text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                        placeholder="Search by name, SKU, or tag..."
                        type="text"
                    />
                </div>
                {/* Filters */}
                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <select className="form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border-none rounded-lg bg-background-dark text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                        <option>All Categories</option>
                        <option>Circuit Breakers</option>
                        <option>Wiring & Cables</option>
                        <option>Lighting</option>
                        <option>Tools</option>
                    </select>
                    <select className="form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border-none rounded-lg bg-background-dark text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                        <option>All Brands</option>
                        <option>Siemens</option>
                        <option>Schneider</option>
                        <option>ABB</option>
                    </select>
                    <select className="form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border-none rounded-lg bg-background-dark text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                        <option>Status: All</option>
                        <option>In Stock</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                    </select>
                    <div className="h-9 w-px bg-white/10 mx-1 hidden sm:block"></div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-dark hover:bg-white/5 text-white text-sm font-medium transition-colors">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            <ProductsTable />

            <div className="h-10"></div>
        </>
    );
}
