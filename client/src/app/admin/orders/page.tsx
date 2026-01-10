'use client';

import { useState } from 'react';
import OrdersTable from '@/components/admin/OrdersTable';
import OrderDetailsDrawer from '@/components/admin/OrderDetailsDrawer';
import { useTranslation } from '@/hooks/useTranslation';
import { Order } from '@/types';
import { AdminPageHeader } from '@/components/admin/shared/AdminPageHeader';

export default function OrdersPage() {
    const { t } = useTranslation();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            <AdminPageHeader
                title={t('admin.orders.title')}
                subtitle={t('admin.orders.subtitle')}
            />

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 relative">
                <OrdersTable onRowClick={(order) => setSelectedOrder(order)} />
            </div>

            <OrderDetailsDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        </div>
    );
}
