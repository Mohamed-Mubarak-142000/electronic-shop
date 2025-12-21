import Link from 'next/link';
import BrandsTable from '@/components/admin/BrandsTable';

export default function BrandsPage() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm font-medium text-gray-400">
                    <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
                    <span className="mx-2 text-white/20">/</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Catalog</span>
                    <span className="mx-2 text-white/20">/</span>
                    <span className="text-white">Brands</span>
                </nav>

                {/* Page Heading & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">Brands Management</h2>
                        <p className="text-gray-400 mt-1">Manage electrical product brands and partnerships.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-primary hover:bg-green-400 text-background-dark font-bold px-6 py-3 rounded-full transition-all shadow-[0_0_15px_rgba(54,226,123,0.3)] hover:shadow-[0_0_20px_rgba(54,226,123,0.5)]">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span>Add New Brand</span>
                    </button>
                </div>

                {/* Filters & Search */}
                <div className="bg-surface-dark border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors material-symbols-outlined">search</span>
                        <input
                            className="w-full h-12 bg-background-dark border-transparent focus:border-primary focus:ring-0 rounded-xl pl-12 pr-4 text-white placeholder:text-gray-400 transition-all"
                            placeholder="Search brand name..."
                            type="text"
                        />
                    </div>
                    {/* Filters */}
                    <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <div className="relative">
                            <select className="appearance-none h-12 bg-background-dark border-transparent focus:border-primary focus:ring-0 rounded-xl pl-4 pr-10 text-white cursor-pointer min-w-[140px]">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                        </div>
                        <div className="relative">
                            <select className="appearance-none h-12 bg-background-dark border-transparent focus:border-primary focus:ring-0 rounded-xl pl-4 pr-10 text-white cursor-pointer min-w-[140px]">
                                <option>Newest First</option>
                                <option>Oldest First</option>
                                <option>Name A-Z</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">sort</span>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <BrandsTable />
            </div>
        </div>
    );
}
