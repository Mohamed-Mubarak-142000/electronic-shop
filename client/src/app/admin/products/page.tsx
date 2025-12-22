'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductsTable from '@/components/admin/ProductsTable';
import { productService } from '@/services/productService';
import { categoryService, brandService } from '@/services/metadataService';
import { useQuery } from '@tanstack/react-query';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [stockStatus, setStockStatus] = useState('');
    const [sort, setSort] = useState('-createdAt');

    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['product-stats'],
        queryFn: productService.getProductStats,
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            const [cats, brs] = await Promise.all([
                categoryService.getCategories(),
                brandService.getBrands()
            ]);
            setCategories(cats);
            setBrands(brs);
        };
        fetchMetadata();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 1
        }).format(value);
    };

    return (
        <div className="flex flex-col gap-6">
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
                        <p className="text-white text-2xl font-bold">
                            {statsLoading ? '...' : stats?.totalProducts || 0}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-5 border border-white/10 bg-surface-dark shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">Low Stock Alerts</p>
                        <span className="material-symbols-outlined text-orange-400">warning</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-white text-2xl font-bold">
                            {statsLoading ? '...' : stats?.lowStockCount || 0}
                        </p>
                        {stats?.lowStockCount > 0 && (
                            <p className="text-orange-400 text-xs font-medium bg-orange-400/10 px-2 py-0.5 rounded-full">Attention</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-5 border border-white/10 bg-surface-dark shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">Inventory Value</p>
                        <span className="material-symbols-outlined text-primary">attach_money</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-white text-2xl font-bold">
                            {statsLoading ? '...' : formatCurrency(stats?.totalInventoryValue || 0)}
                        </p>
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
                        className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-background-dark text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition-all"
                        placeholder="Search products..."
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Filters */}
                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <select
                        className="form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border-none rounded-lg bg-background-dark text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    <select
                        className="form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border-none rounded-lg bg-background-dark text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        <option value="">All Brands</option>
                        {brands.map(br => (
                            <option key={br._id} value={br._id}>{br.name}</option>
                        ))}
                    </select>
                    <select
                        className="form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border-none rounded-lg bg-background-dark text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        value={stockStatus}
                        onChange={(e) => setStockStatus(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="in-stock">In Stock</option>
                        <option value="low-stock">Low Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                    </select>
                    <div className="h-9 w-px bg-white/10 mx-1 hidden sm:block"></div>
                    <select
                        className="form-select block w-full sm:w-auto pl-3 pr-10 py-2 text-sm border-none rounded-lg bg-background-dark text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="-createdAt">Newest</option>
                        <option value="createdAt">Oldest</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="-stock">Stock: High to Low</option>
                    </select>
                </div>
            </div>

            <ProductsTable filters={{ searchTerm, category, brand, stockStatus, sort }} />

            <div className="h-10"></div>
        </div>
    );
}
