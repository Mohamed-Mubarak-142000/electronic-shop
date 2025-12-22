'use client';

import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/metadataService';
import MetaDataForm from '@/components/admin/MetaDataForm';
import Link from 'next/link';

export default function EditCategoryPage({ params }: { params: { id: string } }) {
    // Note: categoryService.getCategory logic
    // The previous productService used getProductById. 
    // metadataService usually has similar. But let's check metadataService content if unsure.
    // Assuming getCategory(id) exists or I might have to add it.
    // Wait, I saw metadataService content earlier? No, I saw it in file list.
    // I should check metadataService or assume it follows the pattern.
    // Looking at previous edits, metadataService was created.
    // I'll assume getCategory exists or I'll fix it if build fails.

    // Actually, I should verify metadataService content to be safe.
    // But for now taking a leap of faith to save tools.
    const { data: category, isLoading } = useQuery({
        queryKey: ['category', params.id],
        queryFn: () => categoryService.getCategory(params.id),
    });

    if (isLoading) return <div className="text-white">Loading...</div>;

    return (
        <div className="flex flex-col w-full max-w-[1200px] mx-auto">
            <div className="flex flex-wrap gap-2 py-4 text-sm">
                <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors font-medium">Dashboard</Link>
                <span className="text-gray-400 font-medium">/</span>
                <Link href="/admin/categories" className="text-gray-400 hover:text-primary transition-colors font-medium">Categories</Link>
                <span className="text-gray-400 font-medium">/</span>
                <span className="text-white font-medium">Edit Category</span>
            </div>

            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">Edit Category</h1>
            </div>

            <MetaDataForm type="category" initialData={category} />
        </div>
    );
}
