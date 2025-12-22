'use client';

import Link from 'next/link';
import MetaDataForm from '@/components/admin/MetaDataForm';

export default function CreateBrandPage() {
    return (
        <div className="flex flex-col w-full max-w-[1200px] mx-auto">
            <div className="flex flex-wrap gap-2 py-4 text-sm">
                <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors font-medium">Dashboard</Link>
                <span className="text-gray-400 font-medium">/</span>
                <Link href="/admin/brands" className="text-gray-400 hover:text-primary transition-colors font-medium">Brands</Link>
                <span className="text-gray-400 font-medium">/</span>
                <span className="text-white font-medium">Create Brand</span>
            </div>

            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Add New Brand</h1>
            </div>

            <MetaDataForm type="brand" />
        </div>
    );
}
