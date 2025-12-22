'use client';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { categoryService, brandService } from '@/services/metadataService';

const categorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    isPublished: z.boolean().default(true),
    brand: z.string().optional().or(z.literal('')),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
    initialData?: any;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: brandsData } = useQuery({ queryKey: ['brands'], queryFn: brandService.getBrands });
    const brandsList = Array.isArray(brandsData) ? brandsData : [];

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema) as any,
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            imageUrl: initialData?.imageUrl || '',
            isPublished: initialData?.isPublished ?? true,
            brand: typeof initialData?.brand === 'string' ? initialData.brand : initialData?.brand?._id || '',
        },
        mode: 'onChange'
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                description: initialData.description,
                imageUrl: initialData.imageUrl,
                isPublished: initialData.isPublished ?? true,
                brand: typeof initialData.brand === 'string' ? initialData.brand : initialData.brand?._id || '',
            });
        }
    }, [initialData, form]);

    const createMutation = useMutation({
        mutationFn: categoryService.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category created successfully');
            router.push('/admin/categories');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create category');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => categoryService.updateCategory(initialData?._id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category updated successfully');
            router.push('/admin/categories');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update category');
        }
    });

    const onSubmit = (values: CategoryFormValues) => {
        if (initialData) {
            updateMutation.mutate(values);
        } else {
            createMutation.mutate(values);
        }
    };

    const inputClass = (error?: any) => `form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400 ${error ? 'border-red-500 focus:border-red-500' : ''}`;

    return (
        <form onSubmit={form.handleSubmit(onSubmit as any)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Form Data (2/3 width) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {/* General Information Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">General Information</h2>
                    <div className="flex flex-col gap-6">
                        {/* Category Name Input */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Category Name</span>
                            <input
                                {...form.register('name')}
                                className={inputClass(form.formState.errors.name)}
                                placeholder="e.g. Circuit Breakers"
                                type="text"
                            />
                            {form.formState.errors.name && <span className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</span>}
                        </label>
                        {/* Description */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Description</span>
                            <div className="flex flex-col rounded-lg border border-white/10 bg-background-dark overflow-hidden">
                                <textarea
                                    {...form.register('description')}
                                    className="form-textarea w-full border-none bg-transparent focus:ring-0 p-4 min-h-[160px] text-white resize-y placeholder:text-gray-400"
                                    placeholder="Enter detailed category description..."
                                ></textarea>
                            </div>
                            {form.formState.errors.description && <span className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</span>}
                        </label>
                    </div>
                </div>
                {/* Media Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">Category Media</h2>
                    <div className="flex flex-col gap-6">
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Image URL</span>
                            <input
                                {...form.register('imageUrl')}
                                className={inputClass(form.formState.errors.imageUrl)}
                                placeholder="https://example.com/category-image.jpg"
                                type="text"
                            />
                            {form.formState.errors.imageUrl && <span className="text-red-500 text-sm mt-1">{form.formState.errors.imageUrl.message}</span>}
                        </label>
                    </div>
                </div>
            </div>
            {/* Right Column: Sidebar (1/3 width) */}
            <div className="flex flex-col gap-8">
                {/* Organization Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">Organization</h2>
                    <div className="flex flex-col gap-6">
                        {/* Status / Published */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Status</span>
                            <select
                                {...form.register('isPublished')}
                                className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4"
                                onChange={(e) => form.setValue('isPublished', e.target.value === 'true')}
                                value={form.watch('isPublished') ? 'true' : 'false'}
                            >
                                <option value="true">Active / Published</option>
                                <option value="false">Hidden / Draft</option>
                            </select>
                        </label>
                        {/* Brand Select Box */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Brand</span>
                            <select
                                {...form.register('brand')}
                                className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4"
                            >
                                <option value="">Select Brand</option>
                                {brandsList.map((brand: any) => (
                                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                {/* Submit Action */}
                <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="w-full flex items-center justify-center rounded-lg h-12 bg-primary text-background-dark text-base font-bold shadow-lg hover:bg-green-400 transition-colors disabled:opacity-50"
                >
                    {(createMutation.isPending || updateMutation.isPending) ? 'Saving...' : (initialData ? 'Update Category' : 'Create Category')}
                </button>
            </div>
        </form>
    );
}
