'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';

// Define the Product type based on API response
type Product = {
    _id: string;
    images: string[];
    name: string;
    sku: string;
    category: { _id: string; name: string } | null;
    brand: { _id: string; name: string } | null;
    price: number;
    stock: number;
};

interface ProductsTableProps {
    filters: {
        searchTerm: string;
        category: string;
        brand: string;
        stockStatus: string;
        sort: string;
    };
}

export default function ProductsTable({ filters }: ProductsTableProps) {
    const { t } = useTranslation();
    const { formatPrice } = useCurrency();
    const [page, setPage] = useState(1);
    const limit = 10;
    const queryClient = useQueryClient();

    // Reset page on filter change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPage(1);
    }, [filters]);

    const { data, isLoading } = useQuery({
        queryKey: ['products', page, filters],
        queryFn: () => productService.getProducts({
            page,
            limit,
            search: filters.searchTerm,
            category: filters.category,
            brand: filters.brand,
            sort: filters.sort,
            // Assuming backend handles stockStatus or we derive filters here
            ...(filters.stockStatus === 'low-stock' && { maxStock: 10, minStock: 1 }),
            ...(filters.stockStatus === 'out-of-stock' && { maxStock: 0 }),
            ...(filters.stockStatus === 'in-stock' && { minStock: 11 }),
        }),
    });

    const deleteMutation = useMutation({
        mutationFn: productService.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product-stats'] });
            toast.success('Product deleted successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete product');
        }
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteMutation.mutate(id);
        }
    };

    const columns: Column<Product>[] = [
        {
            header: t('admin.table.product'),
            cell: (row) => (
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-white/5 flex-shrink-0 overflow-hidden border border-white/10">
                        <img
                            alt={row.name}
                            className="h-full w-full object-cover"
                            src={row.images[0] || '/placeholder.png'}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-medium">{row.name}</span>
                        <span className="text-gray-400 text-xs">{row.sku}</span>
                    </div>
                </div>
            )
        },
        {
            header: t('admin.table.category'),
            cell: (row) => <span className="text-gray-300">{row.category?.name || 'N/A'}</span>,
            className: 'text-gray-300'
        },
        {
            header: t('admin.table.brand'),
            cell: (row) => <span className="text-gray-300">{row.brand?.name || 'N/A'}</span>,
            className: 'text-gray-300'
        },
        {
            header: t('admin.table.price'),
            cell: (row) => <span className="text-white font-medium">{formatPrice(row.price)}</span>,
            className: 'text-white font-medium text-right'
        },
        {
            header: t('admin.table.stock'),
            accessorKey: 'stock',
            className: 'text-gray-300 text-right'
        },
        {
            header: t('admin.table.status'),
            className: 'text-center',
            cell: (row) => {
                let statusColor = '';
                let statusText = '';
                if (row.stock > 10) {
                    statusColor = 'bg-primary/10 text-primary border-primary/20';
                    statusText = t('admin.status.in_stock');
                } else if (row.stock > 0) {
                    statusColor = 'bg-orange-400/10 text-orange-400 border-orange-400/20';
                    statusText = t('admin.status.low_stock');
                } else {
                    statusColor = 'bg-red-500/10 text-red-500 border-red-500/20';
                    statusText = t('admin.status.out_of_stock');
                }

                return (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${statusColor}`}>
                        {statusText}
                    </span>
                );
            }
        },
        {
            header: t('admin.table.actions'),
            className: 'text-right',
            cell: (row) => (
                <div className="flex items-center justify-end gap-2 text-right">
                    <Link href={`/admin/products/edit/${row._id}`}>
                        <button className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
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

    const products = data?.products || [];
    const totalPages = data?.pages || 1;
    const totalItems = data?.total || 0;

    return (
        <div className="flex flex-col">
            <DataTable
                data={products}
                columns={columns}
                className="bg-surface-dark border-white/5"
            />
            {totalItems > limit && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={limit}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
