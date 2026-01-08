'use client';

import { useState } from 'react';
import Link from 'next/link';
import CategoriesTable from '@/components/admin/CategoriesTable';
import { categoryService } from '@/services/metadataService';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';

export default function CategoriesPage() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['category-stats'],
        queryFn: categoryService.getCategoryStats,
    });

    return (
        <div className="flex flex-col gap-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors font-medium">{t('admin.sidebar.dashboard')}</Link>
                <span className="text-gray-400">/</span>
                <span className="text-white font-medium">{t('admin.sidebar.categories')}</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-white text-3xl font-bold tracking-tight">{t('admin.categories.title')}</h2>
                    <p className="text-gray-400 mt-1">{t('admin.categories.subtitle')}</p>
                </div>
                <Link href="/admin/categories/create">
                    <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary hover:bg-green-400 text-background-dark text-sm font-bold transition-all shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        <span>{t('admin.categories.add')}</span>
                    </button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 rounded-xl p-5 border border-white/10 bg-surface-dark shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">{t('admin.stats.total_categories')}</p>
                        <span className="material-symbols-outlined text-primary">grid_view</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-white text-2xl font-bold">
                            {statsLoading ? '...' : stats?.totalCategories || 0}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-5 border border-white/10 bg-surface-dark shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">{t('admin.stats.active_categories')}</p>
                        <span className="material-symbols-outlined text-primary">visibility</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-white text-2xl font-bold">
                            {statsLoading ? '...' : stats?.activeCategories || 0}
                        </p>
                        <p className="text-primary text-xs font-medium bg-primary/10 px-2 py-0.5 rounded-full">{t('admin.stats.live')}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-5 border border-white/10 bg-surface-dark shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm font-medium">{t('admin.stats.hidden_categories')}</p>
                        <span className="material-symbols-outlined text-orange-400">visibility_off</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-white text-2xl font-bold">
                            {statsLoading ? '...' : stats?.hiddenCategories || 0}
                        </p>
                        {stats?.hiddenCategories > 0 && (
                            <p className="text-orange-400 text-xs font-medium bg-orange-400/10 px-2 py-0.5 rounded-full">{t('admin.stats.draft')}</p>
                        )}
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
                        placeholder={t('admin.categories.search_placeholder')}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Filters */}
                <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                    <div className="h-9 w-px bg-white/10 mx-1 hidden sm:block"></div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-dark hover:bg-white/5 text-white text-sm font-medium transition-colors">
                        <span className="material-symbols-outlined text-[18px]">sort</span>
                        <span>Name (A-Z)</span>
                    </button>
                </div>
            </div>

            <CategoriesTable filters={{ searchTerm }} />

            <div className="h-10"></div>
        </div>
    );
}

