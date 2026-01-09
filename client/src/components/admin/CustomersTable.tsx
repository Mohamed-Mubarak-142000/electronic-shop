'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { useTranslation } from '@/hooks/useTranslation';
import { User } from '@/types';

export default function CustomersTable() {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const limit = 10;
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['users', page],
        queryFn: () => userService.getUsers({ pageNumber: page }),
    });

    const deleteMutation = useMutation({
        mutationFn: userService.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('User deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete user');
        }
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            deleteMutation.mutate(id);
        }
    };

    const usersData = data?.users || [];
    const totalPages = data?.pages || 1;
    const totalItems = data?.total || 0; // Assuming API support

    const columns: Column<User>[] = [
        {
            header: t('admin.table.id'),
            cell: (row) => <span className="text-gray-400 text-xs">{row._id.substring(0, 8)}...</span>,
            className: 'w-24'
        },
        {
            header: t('admin.table.name'),
            accessorKey: 'name',
            className: 'font-medium text-white'
        },
        {
            header: t('admin.table.email'),
            accessorKey: 'email',
            className: 'text-gray-400'
        },
        {
            header: t('admin.table.role'),
            cell: (row) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-gray-700/50 text-gray-300'
                    }`}>
                    {row.role === 'admin' ? t('admin.role.admin') : t('admin.role.customer')}
                </span>
            )
        },
        {
            header: t('admin.table.joined'),
            cell: (row) => <span className="text-gray-400">{new Date(row.createdAt).toLocaleDateString()}</span>,
        },
        {
            header: t('admin.table.actions'),
            className: 'text-right',
            cell: (row) => (
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                        title={t('admin.tooltips.delete_user')}
                    >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            )
        }
    ];

    if (isLoading) return <div className="text-white p-8">Loading...</div>;

    return (
        <div className="w-full transition-all flex flex-col">
            <DataTable
                data={usersData}
                columns={columns}
                className="bg-surface-dark border-white/5"
            />
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={limit}
                onPageChange={setPage}
                className="rounded-b-2xl border-x border-b border-white/5 -mt-[1px] bg-[#15261d]"
            />
        </div>
    );
}
