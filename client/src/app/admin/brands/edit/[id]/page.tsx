'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { brandService } from '@/services/metadataService';
import MetaDataForm from '@/components/admin/MetaDataForm';
import Link from 'next/link';

export default function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: brand, isLoading } = useQuery({
        queryKey: ['brand', id],
        queryFn: () => brandService.getBrand(id),
    });

    if (isLoading) return <div className="text-white">Loading...</div>;

    return (
        <div className="flex flex-col w-full max-w-[1200px] mx-auto">
            <div className="flex flex-wrap gap-2 py-4 text-sm">
                <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors font-medium">Dashboard</Link>
                <span className="text-gray-400 font-medium">/</span>
                <Link href="/admin/brands" className="text-gray-400 hover:text-primary transition-colors font-medium">Brands</Link>
                <span className="text-gray-400 font-medium">/</span>
                <span className="text-white font-medium">Edit Brand</span>
            </div>

            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Edit Brand</h1>
            </div>

            <MetaDataForm type="brand" initialData={brand} />
        </div>
    );
}
