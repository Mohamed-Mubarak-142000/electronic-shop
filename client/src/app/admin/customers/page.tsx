'use client';

import Link from 'next/link';
import CustomersTable from '@/components/admin/CustomersTable';
import { useTranslation } from '@/hooks/useTranslation';

export default function CustomersPage() {
    const { t } = useTranslation();

    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            {/* Header */}
            <header className="bg-background-dark border-b border-white/5 py-5 px-8 flex flex-col gap-6 sticky top-0 z-10">
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div>
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.02em]">{t('admin.customers.title')}</h2>
                        <p className="text-gray-400 text-sm mt-1">{t('admin.customers.subtitle')}</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <CustomersTable />
            </div>
        </div>
    );
}
