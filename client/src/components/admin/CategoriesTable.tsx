'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/metadataService';
import Link from 'next/link';

type Category = {
    _id: string;
    imageUrl: string;
    name: string;
    slug: string;
    description: string;
};

export default function CategoriesTable() {
    const [page, setPage] = useState(1);
    const limit = 10;
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['categories'], // Categories endpoint might not support pagination yet based on previous file reads, but let's assume it returns array or we handle it.
        // If metadataService.getCategories returns just array:
        queryFn: categoryService.getCategories,
    });

    // The current getCategories controller sends all categories (res.json(categories)). 
    // If I need pagination I might need to splice it client side or update backend. 
    // For now assuming all categories are returned.
    const categories: Category[] = Array.isArray(data) ? data : [];
    // Client-side pagination for now since backend might just send all
    const totalItems = categories.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedCategories = categories.slice((page - 1) * limit, page * limit);


    const deleteMutation = useMutation({
        mutationFn: categoryService.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category deleted successfully');
        },
        onError: (error: any) => {
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
            header: <span className="text-gray-400">Category</span>,
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
            header: <span className="hidden md:table-cell text-gray-400">Slug</span>,
            cell: (row) => <span className="text-custom-gray text-gray-400">{row.slug}</span>,
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
                    <Link href={`/admin/categories/edit/${row._id}`}>
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
                data={paginatedCategories}
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
