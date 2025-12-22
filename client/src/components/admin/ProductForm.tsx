'use client';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { productService } from '@/services/productService';
import { categoryService, brandService } from '@/services/metadataService';

const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    sku: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    price: z.coerce.number().min(0, 'Price must be positive'),
    // discountPrice: z.coerce.number().optional(), // Not in backend model yet
    stock: z.coerce.number().min(0, 'Stock must be non-negative'),
    category: z.string().min(1, 'Category is required'),
    brand: z.string().optional(),
    images: z.array(z.string().url('Must be a valid URL')).min(1, 'At least one image URL is required'),
    tags: z.string().optional(), // We'll handle comma separation
    isPublished: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: categoryService.getCategories });
    const { data: brands } = useQuery({ queryKey: ['brands'], queryFn: brandService.getBrands });

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: initialData?.name || '',
            sku: initialData?.sku || '',
            description: initialData?.description || '',
            price: initialData?.price || 0,
            stock: initialData?.stock || 0,
            category: initialData?.category?._id || '',
            brand: initialData?.brand?._id || '',
            images: initialData?.images && initialData.images.length > 0 ? initialData.images : [''],
            tags: initialData?.tags ? initialData.tags.join(', ') : '',
            isPublished: initialData?.isPublished ?? true,
        },
        mode: 'onChange'
    });

    // Reset form when initialData loads (if fetching happens after mount)
    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                sku: initialData.sku,
                description: initialData.description,
                price: initialData.price,
                stock: initialData.stock,
                category: initialData.category?._id,
                brand: initialData.brand?._id,
                images: initialData.images,
                tags: initialData.tags?.join(', '),
                isPublished: initialData.isPublished,
            });
        }
    }, [initialData, form]);

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control: form.control as any,
        name: "images"
    });

    const createMutation = useMutation({
        mutationFn: productService.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            router.push('/admin/products');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create product');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => productService.updateProduct(initialData?._id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            router.push('/admin/products');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update product');
        }
    });

    const onSubmit = (values: ProductFormValues) => {
        const payload = {
            ...values,
            tags: values.tags ? values.tags.split(',').map(t => t.trim()).filter(t => t) : [],
        };

        if (initialData) {
            updateMutation.mutate(payload);
        } else {
            createMutation.mutate(payload);
        }
    };

    // Helper to add error class
    const inputClass = (error?: any) => `form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400 ${error ? 'border-red-500 focus:border-red-500' : ''}`;

    return (
        <form onSubmit={form.handleSubmit(onSubmit as any)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Main Form Data (2/3 width) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {/* General Information Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">General Information</h2>
                    <div className="flex flex-col gap-6">
                        {/* Product Name Input */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Product Name</span>
                            <input
                                {...form.register('name')}
                                className={inputClass(form.formState.errors.name)}
                                placeholder="e.g. Industrial Circuit Breaker 50A"
                                type="text"
                            />
                            {form.formState.errors.name && <span className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</span>}
                        </label>
                        {/* SKU Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                            <label className="flex flex-col w-full">
                                <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">SKU</span>
                                <input
                                    {...form.register('sku')}
                                    className={inputClass(form.formState.errors.sku)}
                                    placeholder="e.g. CB-50A-IND"
                                    type="text"
                                />
                            </label>
                        </div>
                        {/* Description */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Description</span>
                            <div className="flex flex-col rounded-lg border border-white/10 bg-background-dark overflow-hidden">
                                <textarea
                                    {...form.register('description')}
                                    className="form-textarea w-full border-none bg-transparent focus:ring-0 p-4 min-h-[160px] text-white resize-y placeholder:text-gray-400"
                                    placeholder="Enter detailed product description..."
                                ></textarea>
                            </div>
                            {form.formState.errors.description && <span className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</span>}
                        </label>
                    </div>
                </div>
                {/* Media Gallery Card (URL Inputs) */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-white">Product Images (URLs)</h2>
                        <button type="button" onClick={() => appendImage('')} className="text-primary text-sm font-bold hover:underline">+ Add Image URL</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {imageFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <input
                                    {...form.register(`images.${index}` as const)} // Type assertion
                                    className={inputClass()}
                                    placeholder="https://example.com/image.jpg"
                                />
                                <button type="button" onClick={() => removeImage(index)} className="p-2 text-red-500 hover:bg-white/5 rounded">
                                    <span className="material-symbols-outlined">delete</span>
                                </button>
                            </div>
                        ))}
                        {form.formState.errors.images && <span className="text-red-500 text-sm">{form.formState.errors.images.message || form.formState.errors.images.root?.message}</span>}
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
                            >
                                <option value="true">Published</option>
                                <option value="false">Draft / Hidden</option>
                            </select>
                        </label>
                        {/* Category */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Category</span>
                            <select
                                {...form.register('category')}
                                className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4"
                            >
                                <option value="">Select Category</option>
                                {categories?.map((cat: any) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            {form.formState.errors.category && <span className="text-red-500 text-sm mt-1">{form.formState.errors.category.message}</span>}
                        </label>
                        {/* Brand */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Brand</span>
                            <select
                                {...form.register('brand')}
                                className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4"
                            >
                                <option value="">Select Brand</option>
                                {brands?.map((brand: any) => (
                                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                                ))}
                            </select>
                        </label>
                        {/* Tags */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Tags (comma separated)</span>
                            <input
                                {...form.register('tags')}
                                className={inputClass()}
                                placeholder="Industrial, Heavy Duty, etc."
                                type="text"
                            />
                        </label>
                    </div>
                </div>
                {/* Pricing & Inventory Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">Pricing & Inventory</h2>
                    <div className="flex flex-col gap-6">
                        {/* Price */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Price ($)</span>
                            <input
                                {...form.register('price')}
                                className={inputClass(form.formState.errors.price)}
                                placeholder="0.00"
                                step="0.01"
                                type="number"
                            />
                            {form.formState.errors.price && <span className="text-red-500 text-sm mt-1">{form.formState.errors.price.message}</span>}
                        </label>
                        {/* Stock Quantity */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">Stock Quantity</span>
                            <input
                                {...form.register('stock')}
                                className={inputClass(form.formState.errors.stock)}
                                placeholder="0"
                                type="number"
                            />
                            {form.formState.errors.stock && <span className="text-red-500 text-sm mt-1">{form.formState.errors.stock.message}</span>}
                        </label>
                    </div>
                </div>
                {/* Submit Action */}
                <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="w-full flex items-center justify-center rounded-lg h-12 bg-primary text-background-dark text-base font-bold shadow-lg hover:bg-green-400 transition-colors disabled:opacity-50"
                >
                    {(createMutation.isPending || updateMutation.isPending) ? 'Saving...' : (initialData ? 'Update Product' : 'Publish Product')}
                </button>
            </div>
        </form>
    );
}
