'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dashboardService, { DashboardStats as StatsType } from '@/services/dashboardService';

import { useTranslation } from '@/hooks/useTranslation';

interface DashboardStatsProps {
    stats: StatsType | null;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
    const { t } = useTranslation();

    if (!stats) return null;

    const cards = [
        {
            title: t('admin.stats.revenue'),
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: 'payments',
            trend: `+${stats.trends.revenue}%`,
            color: 'text-primary',
            href: '/admin/orders'
        },
        {
            title: t('admin.stats.orders'),
            value: stats.totalOrders.toLocaleString(),
            icon: 'shopping_bag',
            trend: `+${stats.trends.orders}%`,
            color: 'text-blue-400',
            href: '/admin/orders'
        },
        {
            title: t('admin.stats.products'),
            value: stats.totalProducts.toLocaleString(),
            icon: 'inventory_2',
            trend: stats.lowStockCount > 0 ? `${stats.lowStockCount} low stock` : 'Healthy stock',
            color: 'text-orange-400',
            href: '/admin/products'
        },
        {
            title: t('admin.stats.categories'),
            value: stats.totalCategories.toLocaleString(),
            icon: 'category',
            trend: 'Direct browse',
            color: 'text-pink-400',
            href: '/admin/categories'
        },
        {
            title: t('admin.stats.brands'),
            value: stats.totalBrands.toLocaleString(),
            icon: 'verified_user',
            trend: 'Partner brands',
            color: 'text-indigo-400',
            href: '/admin/brands'
        },
        {
            title: t('admin.stats.customers'),
            value: stats.totalUsers.toLocaleString(),
            icon: 'group',
            trend: `+${stats.trends.users}%`,
            color: 'text-purple-400',
            href: '/admin/customers'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
                <Link key={index} href={card.href} className="bg-card-dark p-5 rounded-xl border border-white/5 shadow-sm hover:border-primary/30 transition-all group hover:-translate-y-1 block">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 bg-background-dark rounded-lg ${card.color}`}>
                            <span className="material-symbols-outlined">{card.icon}</span>
                        </div>
                        <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${card.title === 'Products' && stats.lowStockCount > 0 ? 'text-red-400 bg-red-400/10' : 'text-primary bg-primary/10'}`}>
                            {card.trend !== 'Direct browse' && card.trend !== 'Healthy stock' && card.trend !== 'Partner brands' && (
                                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                            )}
                            {card.trend}
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{card.value}</h3>
                </Link>
            ))}
        </div>
    );
}
