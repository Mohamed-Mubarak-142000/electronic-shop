import Link from 'next/link';
import CategoriesTable from '@/components/admin/CategoriesTable';

export default function CategoriesPage() {
    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 relative z-10">
            {/* Header area with gradient glow */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#1c3829] to-transparent pointer-events-none opacity-50 -z-10"></div>

            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <Link href="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <a className="hover:text-primary transition-colors cursor-pointer">Catalog</a>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <span className="text-white font-medium">Categories</span>
                </nav>

                {/* Page Header */}
                <div className="flex flex-wrap justify-between items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-4xl lg:text-5xl font-bold tracking-tight">Categories Management</h1>
                        <p className="text-gray-400 text-lg font-light max-w-2xl">Organize your product inventory structure and manage visibility.</p>
                    </div>
                    <button className="group flex items-center gap-2 bg-primary hover:bg-[#2dc46b] active:scale-95 transition-all text-background-dark px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(54,226,123,0.3)] hover:shadow-[0_0_30px_rgba(54,226,123,0.5)]">
                        <span className="material-symbols-outlined font-bold">add</span>
                        <span>Add Category</span>
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1 p-6 rounded-2xl border border-[#254632] bg-surface-dark/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute right-[-20px] top-[-20px] p-6 bg-[#254632]/30 rounded-full group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-4xl text-gray-400/50">grid_view</span>
                        </div>
                        <p className="text-gray-400 font-medium">Total Categories</p>
                        <p className="text-white text-3xl font-bold tracking-tight">45</p>
                        <div className="w-full bg-[#254632] h-1 rounded-full mt-2 overflow-hidden">
                            <div className="bg-primary h-full w-[80%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-6 rounded-2xl border border-[#254632] bg-surface-dark/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute right-[-20px] top-[-20px] p-6 bg-[#254632]/30 rounded-full group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-4xl text-gray-400/50">visibility</span>
                        </div>
                        <p className="text-gray-400 font-medium">Active</p>
                        <p className="text-white text-3xl font-bold tracking-tight">42</p>
                        <div className="w-full bg-[#254632] h-1 rounded-full mt-2 overflow-hidden">
                            <div className="bg-primary h-full w-[95%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-6 rounded-2xl border border-[#254632] bg-surface-dark/50 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute right-[-20px] top-[-20px] p-6 bg-[#254632]/30 rounded-full group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-4xl text-gray-400/50">visibility_off</span>
                        </div>
                        <p className="text-gray-400 font-medium">Hidden</p>
                        <p className="text-white text-3xl font-bold tracking-tight">3</p>
                        <div className="w-full bg-[#254632] h-1 rounded-full mt-2 overflow-hidden">
                            <div className="bg-orange-400 h-full w-[5%] rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-dark p-2 rounded-2xl border border-[#254632]">
                    {/* Search */}
                    <div className="w-full sm:max-w-md relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
                        </div>
                        <input
                            className="block w-full pl-12 pr-4 py-3 bg-[#254632]/50 border-none rounded-xl text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:bg-[#254632] transition-all"
                            placeholder="Search categories by name or ID..."
                            type="text"
                        />
                    </div>
                    {/* Filters */}
                    <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 px-2 sm:px-0">
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#254632] text-white text-sm font-medium hover:bg-[#254632]/80 transition-colors whitespace-nowrap">
                            <span className="material-symbols-outlined text-lg">filter_list</span>
                            Filter
                        </button>
                        <div className="h-6 w-px bg-[#254632] mx-1"></div>
                        <button className="px-4 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium whitespace-nowrap">
                            All Status
                        </button>
                        <button className="px-4 py-2.5 rounded-full bg-transparent border border-[#254632] text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">
                            Active
                        </button>
                        <button className="px-4 py-2.5 rounded-full bg-transparent border border-[#254632] text-gray-400 hover:text-white text-sm font-medium whitespace-nowrap transition-colors">
                            Hidden
                        </button>
                    </div>
                </div>

                <CategoriesTable />

                <div className="h-10"></div>
            </div>
        </div>
    );
}
