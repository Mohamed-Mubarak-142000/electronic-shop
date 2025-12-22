'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { brandService } from '@/services/metadataService';
import Link from 'next/link';

type Brand = {
    _id: string;
    logoUrl: string;
    name: string;
    slug: string;
    description: string;
};

export default function BrandsTable() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: brandService.getBrands,
    });

    const brands: Brand[] = Array.isArray(data) ? data : [];
    const totalItems = brands.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedBrands = brands.slice((page - 1) * limit, page * limit);

    const deleteMutation = useMutation({
        mutationFn: brandService.deleteBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            toast.success('Brand deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete brand');
        }
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            deleteMutation.mutate(id);
        }
    };

    const columns: Column<Brand>[] = [
        {
            header: <span className="text-gray-400">Brand</span>,
            cell: (row) => (
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-white p-2 shrink-0 overflow-hidden flex items-center justify-center border-2 border-[#254632] group-hover:border-primary transition-colors">
                        <img className="w-full h-auto object-contain" src={row.logoUrl || '/placeholder.png'} alt={row.name} />
                    </div>
                    <div>
                        <p className="text-white font-medium">{row.name}</p>
                    </div>
                </div>
            )
        },
        {
            header: <span className="hidden md:table-cell text-gray-400">Slug</span>,
            cell: (row) => <span className="text-gray-400">{row.slug}</span>,
            className: "hidden md:table-cell font-mono"
        },
        {
            header: <span className="text-gray-400">Description</span>,
            cell: (row) => <span className="text-gray-400 truncate max-w-xs block">{row.description}</span>,
        },
        {
            header: <span className="text-gray-400">Actions</span>,
            className: "text-right pr-6",
            cell: (row) => (
                <div className="flex items-center justify-end gap-2 text-right">
                    <Link href={`/admin/brands/edit/${row._id}`}>
                        <button className="size-8 flex items-center justify-center rounded-full bg-[#254632] text-white hover:bg-primary hover:text-background-dark transition-colors" title="Edit">
                            <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(row._id)}
                        className="size-8 flex items-center justify-center rounded-full bg-[#254632] text-white hover:bg-red-500 hover:text-white transition-colors" title="Delete"
                    >
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            )
        }
    ];

    if (isLoading) return <div className="text-white">Loading...</div>;

    return (
        <div className="flex flex-col">
            <DataTable
                data={paginatedBrands}
                columns={columns}
                className="rounded-3xl shadow-xl bg-surface-dark border-[#254632]"
            />
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={limit}
                onPageChange={setPage}
                className="rounded-3xl shadow-xl mt-4"
            />
        </div>
    );
}
