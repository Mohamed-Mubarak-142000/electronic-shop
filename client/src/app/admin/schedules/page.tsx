'use client';

import React from 'react';
import SchedulesTable from '@/components/admin/schedules/SchedulesTable';
import ScheduleForm from '@/components/admin/schedules/ScheduleForm';
import { useTranslation } from '@/hooks/useTranslation';

export default function SchedulesPage() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white/90">{t('admin.schedules.title')}</h1>
                    <p className="text-sm text-gray-400 mt-1">{t('admin.schedules.subtitle')}</p>
                </div>
                <ScheduleForm />
            </div>
            
            <SchedulesTable />
        </div>
    );
}
