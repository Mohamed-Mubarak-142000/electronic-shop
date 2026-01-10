'use client';

import CustomersTable from '@/components/admin/CustomersTable';
import { useTranslation } from '@/hooks/useTranslation';
import { AdminPageHeader } from '@/components/admin/shared/AdminPageHeader';

export default function CustomersPage() {
    const { t } = useTranslation();

    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            <AdminPageHeader
                title={t('admin.customers.title')}
                subtitle={t('admin.customers.subtitle')}
            />

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <CustomersTable />
            </div>
        </div>
    );
}
