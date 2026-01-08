'use client';

import { useState } from 'react';
import Link from 'next/link';
import OrdersTable from '@/components/admin/OrdersTable';
import OrderDetailsDrawer from '@/components/admin/OrderDetailsDrawer';
import { useTranslation } from '@/hooks/useTranslation';

export default function OrdersPage() {
    const { t } = useTranslation();
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            {/* Header & Toolbar */}
            <header className="bg-background-dark border-b border-white/5 py-5 px-8 flex flex-col gap-6 sticky top-0 z-10">
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div>
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.02em]">{t('admin.orders.title')}</h2>
                        <p className="text-gray-400 text-sm mt-1">{t('admin.orders.subtitle')}</p>
                    </div>
                </div>
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Stats logic could be added here later */}
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                <OrdersTable onRowClick={(order) => setSelectedOrder(order)} />
            </div>

            <OrderDetailsDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        </div>
    );
}
