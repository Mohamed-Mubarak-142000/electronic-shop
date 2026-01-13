'use client';

import OrdersTable from '@/components/admin/OrdersTable';
import { useTranslation } from '@/hooks/useTranslation';
import { AdminPageHeader } from '@/components/admin/shared/AdminPageHeader';

export default function OrdersPage() {
    const { t } = useTranslation();

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <AdminPageHeader
                title={t('admin.orders.title')}
                subtitle={t('admin.orders.subtitle')}
            />

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8">
                <OrdersTable />
            </div>
        </div>
    );
}
