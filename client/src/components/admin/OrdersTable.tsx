'use client';

import { useState } from 'react';
import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';

type Order = {
    _id: string;
    user: {
        name: string;
        email: string;
    };
    createdAt: string;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    status?: string; // Derived
};

export default function OrdersTable({ onRowClick }: { onRowClick?: (order: Order) => void }) {
    const { t } = useTranslation();
    const { formatPrice } = useCurrency();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading } = useQuery({
        queryKey: ['orders', page], // Add page to query key if server pagination
        queryFn: () => orderService.getOrders({ pageNumber: page }), // Assuming API supports pageNumber
    });

    const ordersData = data?.orders || [];
    const totalPages = data?.pages || 1;
    const totalItems = data?.total || 0; // Assuming API returns total count

    // Transform API data to Table format if needed
    const orders: Order[] = ordersData.map((order: Order & { status?: string }) => ({
        ...order,
        status: order.isDelivered ? 'Delivered' : (order.isPaid ? 'Paid' : 'Pending'), 
    }));

    const columns: Column<Order>[] = [
        {
            header: t('admin.table.order_id'),
            className: 'font-bold text-white',
            cell: (row) => (
                <span className="text-white">{row._id.substring(0, 8)}...</span>
            )
        },
        {
            header: t('admin.table.customer'),
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-900/50 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs font-bold uppercase">
                        {row.user?.name?.substring(0, 2) || 'NA'}
                    </div>
                    <div>
                        <p className="text-white font-medium">{row.user?.name || 'Unknown'}</p>
                        <p className="text-gray-500 text-xs">{row.user?.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: t('admin.table.order_date'),
            cell: (row) => <span className="text-gray-400">{new Date(row.createdAt).toLocaleDateString()}</span>,
            className: 'text-gray-400'
        },
        {
            header: t('admin.table.total'),
            cell: (row) => <span className="font-mono font-medium text-white">{formatPrice(row.totalPrice)}</span>,
            className: 'font-mono font-medium text-white'
        },
        {
            header: t('admin.table.status'),
            cell: (row) => {
                let statusStyles = '';
                let dotColor = '';

                const status = row.isDelivered ? 'Delivered' : (row.isPaid ? 'Paid' : 'Pending');
                const statusLabel = row.isDelivered ? t('admin.status.delivered') : (row.isPaid ? t('admin.status.paid') : t('admin.status.pending'));

                if (status === 'Pending') {
                    statusStyles = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
                    dotColor = 'bg-yellow-400';
                } else if (status === 'Paid') {
                    statusStyles = 'bg-blue-500/20 text-blue-400 border-blue-500/20';
                    dotColor = 'bg-blue-400';
                } else {
                    statusStyles = 'bg-green-500/20 text-green-400 border-green-500/20';
                    dotColor = 'bg-green-400';
                }

                return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyles}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                        {statusLabel}
                    </span>
                );
            }
        },
        {
            header: t('admin.table.actions'),
            className: 'text-right',
            cell: (row) => (
                <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">visibility</span>
                </button>
            )
        }
    ];

    if (isLoading) return <div className="text-white">Loading...</div>;

    return (
        <div className="w-full lg:w-[65%] xl:w-[70%] transition-all flex flex-col">
            <DataTable
                data={orders}
                columns={columns}
                className="bg-surface-dark border-white/5"
                onRowClick={onRowClick}
            />
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems} // API usually provides this
                itemsPerPage={limit}
                onPageChange={setPage}
                className="rounded-b-2xl border-x border-b border-white/5 -mt-[1px] bg-[#15261d]"
            />
        </div>
    );
}
