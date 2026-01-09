'use client';

import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/metadataService';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { Category } from '@/types';

interface CategoriesTableProps {
    filters: {
        searchTerm: string;
    };
}

export default function CategoriesTable({ filters }: CategoriesTableProps) {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const limit = 10;
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: categoryService.getCategories,
    });

    const categories: Category[] = Array.isArray(data) ? data : [];

    // Client-side filtering
    const filteredCategories = useMemo(() => {
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            (cat.description && cat.description.toLowerCase().includes(filters.searchTerm.toLowerCase()))
        );
    }, [categories, filters.searchTerm]);

    const totalItems = filteredCategories.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedCategories = filteredCategories.slice((page - 1) * limit, page * limit);

    const deleteMutation = useMutation({
        mutationFn: categoryService.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['category-stats'] });
            toast.success('Category deleted successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete category');
        }
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this category?')) {
            deleteMutation.mutate(id);
        }
    };

    const columns: Column<Category>[] = [
        {
            header: <span className="text-gray-400">{t('admin.table.category')}</span>,
            cell: (row) => (
                <div className={`flex items-center gap-4`}>
                    <img className="size-12 rounded-full object-cover border-2 border-[#254632] group-hover:border-primary transition-colors" src={row.imageUrl || '/placeholder.png'} alt={row.name} />
                    <div>
                        <p className="text-white font-medium">{row.name}</p>
                    </div>
                </div>
            )
        },
        {
            header: <span className="hidden md:table-cell text-gray-400">{t('admin.table.slug')}</span>,
            cell: (row) => <span className="text-custom-gray text-gray-400">{row.slug}</span>,
            className: "hidden md:table-cell font-mono"
        },
        {
            header: <span className="text-gray-400">{t('admin.table.description')}</span>,
            cell: (row) => <span className="text-gray-400 truncate max-w-xs block">{row.description}</span>,
        },
        {
            header: <span className="text-gray-400">{t('admin.table.actions')}</span>,
            className: "text-right pr-6",
            cell: (row) => (
                <div className="flex items-center justify-end gap-2 text-right">
                    <Link href={`/admin/categories/edit/${row._id}`}>
                        <button className="size-8 flex items-center justify-center rounded-full bg-[#254632] text-white hover:bg-primary hover:text-background-dark transition-colors" title={t('admin.tooltips.edit')}>
                            <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="size-8 flex items-center justify-center rounded-full bg-[#254632] text-white hover:bg-red-500 hover:text-white transition-colors" title={t('admin.tooltips.delete')}
                    >
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            )
        }
    ];

    if (isLoading) return (
        <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="flex flex-col">
            <DataTable
                data={paginatedCategories}
                columns={columns}
                className="rounded-3xl shadow-xl bg-surface-dark border-[#254632]"
            />
            {totalItems > limit && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                    onPageChange={setPage}
                    className="rounded-3xl shadow-xl mt-4"
                />
            )}
        </div>
    );
}
