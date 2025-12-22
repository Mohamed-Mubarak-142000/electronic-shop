'use client';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { brandService } from '@/services/metadataService';

const brandSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    logoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    isPublished: z.boolean().default(true),
});

type BrandFormValues = z.infer<typeof brandSchema>;

interface BrandFormProps {
    initialData?: any;
}

export default function BrandForm({ initialData }: BrandFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema) as any,
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            logoUrl: initialData?.logoUrl || '',
            isPublished: initialData?.isPublished ?? true,
        },
        mode: 'onChange'
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                description: initialData.description,
                logoUrl: initialData.logoUrl,
                isPublished: initialData.isPublished ?? true,
            });
        }
    }, [initialData, form]);

    const createMutation = useMutation({
        mutationFn: brandService.createBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            toast.success('Brand created successfully');
            router.push('/admin/brands');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create brand');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => brandService.updateBrand(initialData?._id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brands'] });
            toast.success('Brand updated successfully');
            router.push('/admin/brands');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update brand');
        }
    });

    const onSubmit = (values: BrandFormValues) => {
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
                        {/* Brand Name Input */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Brand Name</span>
                            <input
                                {...form.register('name')}
                                className={inputClass(form.formState.errors.name)}
                                placeholder="e.g. Siemens"
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
                                    placeholder="Enter brand description..."
                                ></textarea>
                            </div>
                            {form.formState.errors.description && <span className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</span>}
                        </label>
                    </div>
                </div>
                {/* Media Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">Brand Media</h2>
                    <div className="flex flex-col gap-6">
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Logo URL</span>
                            <input
                                {...form.register('logoUrl')}
                                className={inputClass(form.formState.errors.logoUrl)}
                                placeholder="https://example.com/brand-logo.png"
                                type="text"
                            />
                            {form.formState.errors.logoUrl && <span className="text-red-500 text-sm mt-1">{form.formState.errors.logoUrl.message}</span>}
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
                    </div>
                </div>
                {/* Submit Action */}
                <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="w-full flex items-center justify-center rounded-lg h-12 bg-primary text-background-dark text-base font-bold shadow-lg hover:bg-green-400 transition-colors disabled:opacity-50"
                >
                    {(createMutation.isPending || updateMutation.isPending) ? 'Saving...' : (initialData ? 'Update Brand' : 'Create Brand')}
                </button>
            </div>
        </form>
    );
}
