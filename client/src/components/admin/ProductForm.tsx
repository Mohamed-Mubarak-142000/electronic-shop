'use client';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { productService } from '@/services/productService';
import { categoryService, brandService } from '@/services/metadataService';
import { useTranslation } from '@/hooks/useTranslation';
import { useConfigStore } from '@/store/useConfigStore';

const createProductSchema = (minImages: number, maxImages: number, t: any) => z.object({
    name: z.string().min(1, 'Name is required'),
    nameAr: z.string().min(1, 'Arabic Name is required'),
    sku: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    descriptionAr: z.string().min(1, 'Arabic Description is required'),
    price: z.coerce.number().min(0, 'Price must be positive'),
    stock: z.coerce.number().min(0, 'Stock must be non-negative'),
    category: z.string().min(1, 'Category is required'),
    brand: z.string().optional(),
    images: z.array(z.string())
        .min(minImages, t('validation.min_images', { min: minImages }))
        .max(maxImages, t('validation.max_images', { max: maxImages })),
    tags: z.string().optional(),
    isPublished: z.boolean().default(true),
});

type ProductFormValues = z.infer<ReturnType<typeof createProductSchema>>;

interface ProductFormProps {
    initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const { t } = useTranslation();
    const { configs } = useConfigStore();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [uploading, setUploading] = React.useState(false);

    const minImages = Number(configs.minProductImages) || 2;
    const maxImages = Number(configs.maxProductImages) || 4;
    const productSchema = createProductSchema(minImages, maxImages, t);

    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: categoryService.getCategories });
    const { data: brands } = useQuery({ queryKey: ['brands'], queryFn: brandService.getBrands });

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: {
            name: initialData?.name || '',
            nameAr: initialData?.nameAr || '',
            sku: initialData?.sku || '',
            description: initialData?.description || '',
            descriptionAr: initialData?.descriptionAr || '',
            price: initialData?.price || 0,
            stock: initialData?.stock || 0,
            category: initialData?.category?._id || '',
            brand: initialData?.brand?._id || '',
            images: initialData?.images && initialData.images.length > 0 ? initialData.images : [],
            tags: initialData?.tags ? initialData.tags.join(', ') : '',
            isPublished: initialData?.isPublished ?? true,
        },
        mode: 'onChange'
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                nameAr: initialData.nameAr,
                sku: initialData.sku,
                description: initialData.description,
                descriptionAr: initialData.descriptionAr,
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

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const currentImages = form.getValues('images') || [];
            if (currentImages.length + files.length > maxImages) {
                toast.error(t('validation.image_limit_error', { max: maxImages }));
                return;
            }

            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            setUploading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/upload/cloudinary/multiple`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (data.urls && Array.isArray(data.urls)) {
                    const currentImages = form.getValues('images') || [];
                    form.setValue('images', [...currentImages, ...data.urls]);
                    toast.success('Images uploaded successfully');
                } else {
                    throw new Error('Invalid response from server');
                }
                setUploading(false);
            } catch (error) {
                console.error(error);
                setUploading(false);
                toast.error('Image upload failed');
            }
        }
    };

    const removeImage = (indexToRemove: number) => {
        const currentImages = form.getValues('images');
        form.setValue('images', currentImages.filter((_, index) => index !== indexToRemove));
    };

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

    const inputClass = (error?: any) => `form-input flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400 ${error ? 'border-red-500 focus:border-red-500' : ''}`;

    return (
        <form onSubmit={form.handleSubmit(onSubmit as any)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">{t('admin.product.general_info')}</h2>
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col w-full">
                                <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.name_en')}</span>
                                <input
                                    {...form.register('name')}
                                    className={inputClass(form.formState.errors.name)}
                                    placeholder="e.g. Industrial Circuit Breaker 50A"
                                    type="text"
                                />
                                {form.formState.errors.name && <span className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</span>}
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.name_ar')}</span>
                                <input
                                    {...form.register('nameAr')}
                                    className={inputClass(form.formState.errors.nameAr)}
                                    placeholder="اسم المنتج بالعربية"
                                    type="text"
                                />
                                {form.formState.errors.nameAr && <span className="text-red-500 text-sm mt-1">{form.formState.errors.nameAr.message}</span>}
                            </label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                            <label className="flex flex-col w-full">
                                <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.sku')}</span>
                                <input
                                    {...form.register('sku')}
                                    className={inputClass(form.formState.errors.sku)}
                                    placeholder="e.g. CB-50A-IND"
                                    type="text"
                                />
                            </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex flex-col w-full">
                                <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.desc_en')}</span>
                                <div className="flex flex-col rounded-lg border border-white/10 bg-background-dark overflow-hidden">
                                    <textarea
                                        {...form.register('description')}
                                        className="form-textarea w-full border-none bg-transparent focus:ring-0 p-4 min-h-[160px] text-white resize-y placeholder:text-gray-400"
                                        placeholder="Enter detailed product description..."
                                    ></textarea>
                                </div>
                                {form.formState.errors.description && <span className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</span>}
                            </label>
                            <label className="flex flex-col w-full">
                                <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.desc_ar')}</span>
                                <div className="flex flex-col rounded-lg border border-white/10 bg-background-dark overflow-hidden">
                                    <textarea
                                        {...form.register('descriptionAr')}
                                        className="form-textarea w-full border-none bg-transparent focus:ring-0 p-4 min-h-[160px] text-white resize-y placeholder:text-gray-400"
                                        placeholder="وصف المنتج بالعربية..."
                                    ></textarea>
                                </div>
                                {form.formState.errors.descriptionAr && <span className="text-red-500 text-sm mt-1">{form.formState.errors.descriptionAr.message}</span>}
                            </label>
                        </div>
                    </div>
                </div>
                {/* Media Gallery Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-white">{t('admin.product.images')}</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label className="relative cursor-pointer">
                            <input
                                type="file"
                                multiple
                                onChange={uploadFileHandler}
                                className="hidden"
                                id="product-images-upload"
                            />
                            <div className="flex items-center justify-center gap-3 w-full h-32 rounded-lg border-2 border-dashed border-white/20 bg-background-dark hover:border-primary hover:bg-white/5 transition-all">
                                <span className="material-symbols-outlined text-4xl text-primary">add</span>
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold">{t('admin.product.choose_images')}</span>
                                    <span className="text-gray-400 text-sm">{t('admin.product.drag_drop')}</span>
                                    <span className="text-xs text-gray-500 mt-1">{t('validation.image_range_hint', { min: minImages, max: maxImages })}</span>
                                </div>
                            </div>
                        </label>
                        {uploading && <p className="text-sm text-yellow-400">Uploading to Cloudinary...</p>}
                        <div className="flex flex-wrap gap-4 mt-4">
                            {form.watch('images')?.map((img, index) => (
                                <div key={index} className="relative group">
                                    <img src={img} alt={`Product ${index}`} className="h-24 w-24 object-cover rounded-lg border border-white/10" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {form.formState.errors.images && <span className="text-red-500 text-sm">{form.formState.errors.images.message}</span>}
                    </div>
                </div>
            </div>
            {/* Right Column: Sidebar (1/3 width) */}
            <div className="flex flex-col gap-8">
                {/* Organization Card */}
                <div className="bg-surface-dark rounded-xl p-6 shadow-sm border border-white/10">
                    <h2 className="text-lg font-bold text-white mb-6">{t('admin.product.organization')}</h2>
                    <div className="flex flex-col gap-6">
                        {/* Status / Published */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.status')}</span>
                            <select
                                {...form.register('isPublished')}
                                className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4"
                                onChange={(e) => form.setValue('isPublished', e.target.value === 'true')}
                            >
                                <option value="true">{t('admin.product.published')}</option>
                                <option value="false">{t('admin.product.draft')}</option>
                            </select>
                        </label>
                        {/* Category */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.category')}</span>
                            <select
                                {...form.register('category')}
                                className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4"
                            >
                                <option value="">{t('admin.product.select_category')}</option>
                                {categories?.map((cat: any) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            {form.formState.errors.category && <span className="text-red-500 text-sm mt-1">{form.formState.errors.category.message}</span>}
                        </label>
                        {/* Brand */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.brand')}</span>
                            <select
                                {...form.register('brand')}
                                className="form-select flex w-full rounded-lg border-white/10 bg-background-dark text-white focus:ring-2 focus:ring-primary focus:border-primary h-12 px-4"
                            >
                                <option value="">{t('admin.product.select_brand')}</option>
                                {brands?.map((brand: any) => (
                                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                                ))}
                            </select>
                        </label>
                        {/* Tags */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.tags')}</span>
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
                    <h2 className="text-lg font-bold text-white mb-6">{t('admin.product.pricing_inventory')}</h2>
                    <div className="flex flex-col gap-6">
                        {/* Price */}
                        <label className="flex flex-col w-full">
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.price')}</span>
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
                            <span className="text-white text-sm font-bold uppercase tracking-wide pb-2">{t('admin.product.stock')}</span>
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
                    {(createMutation.isPending || updateMutation.isPending) ? t('admin.product.saving') : (initialData ? t('admin.product.update') : t('admin.product.publish'))}
                </button>
            </div>
        </form>
    );
}
