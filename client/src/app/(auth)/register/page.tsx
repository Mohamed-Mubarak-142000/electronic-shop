'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useState } from 'react';
import toast from 'react-hot-toast';

const formSchema = z.object({
    account_type: z.enum(['homeowner', 'business']),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors,  isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            account_type: 'homeowner',
            name: '',
            email: '',
            password: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: FormData) => {
            return await authService.register(values);
        },
        onSuccess: () => {
            toast.success('Registration successful! Please log in.');
            router.push('/login');
        },
        onError: (err: Error & { response?: { data?: { message?: string } } }) => {
            setServerError(err.response?.data?.message || err.message || 'Registration failed');
        },
    });

    const onSubmit = (values: FormData) => {
        setServerError('');
        mutation.mutate(values);
    };

    return (
        <main className="relative flex min-h-screen w-full flex-col lg:flex-row">
            {/* Header - Sticky */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-surface-highlight px-6 lg:px-10 py-4 absolute top-0 w-full z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    </Link>
                    <h2 className="text-xl font-bold leading-tight tracking-tight dark:text-white">VoltSupply</h2>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex gap-6">
                        <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300">Products</Link>
                        <Link href="/brands" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300">Brands</Link>
                        <Link href="/deals" className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300">Deals</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-bold dark:text-white hover:text-primary transition-colors hidden sm:block">Log In</Link>
                    <button className="flex items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary hover:bg-primary/90 transition-colors text-background-dark text-sm font-bold">
                        <span className="truncate">Support</span>
                    </button>
                </div>
            </header>

            {/* Left Column: Visual/Hero */}
            <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-auto overflow-hidden order-1 lg:order-1 pt-[72px] lg:pt-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBynRGmpDd3oHIHavedcV-Fr0oi4izavNdNr5mcjyRyJeAXbqWkLoMF7xQsFGEcPct7WQqNK2KYSW1lw1E9mzUYzWj2tIQvw4K9PBXJROiV6kSEdahXHT-Ak2ITCIxprQ24aCM3WpgjFN9voffbh07QiAOalM0HsvupfWb1xUw403MdDK7PtAJaxTB11vHWsCxEjBV2kMLpXPopJDInSkewX26zel5zWIQq0Fc_dj8nIn24YprIpqRrnZYG8GTr949KjPSSzTBlyRQ')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background-dark"></div>
                <div className="absolute bottom-0 left-0 p-8 lg:p-16 z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm mb-4">
                        <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Trusted by 50k+ Pros</span>
                    </div>
                    <h1 className="text-3xl lg:text-5xl font-black leading-tight tracking-tight text-white mb-4">
                        Power up your workflow.
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Access wholesale pricing, manage project lists, and get same-day shipping on over 10,000 electrical components.
                    </p>
                </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:p-20 order-2 lg:order-2 bg-background-light dark:bg-background-dark pt-[40px] lg:pt-[80px]">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold dark:text-white mb-2">Join the Circuit</h2>
                        <p className="text-gray-600 dark:text-gray-400">Create an account to start your project today.</p>
                    </div>
                    
                    {serverError && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900/30 dark:border-red-900 dark:text-red-400">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        {/* Segmented Control */}
                        <div className="p-1 bg-gray-200 dark:bg-surface-dark rounded-full flex relative">
                            <label className="flex-1 text-center cursor-pointer relative z-10">
                                <input 
                                    {...register("account_type")}
                                    type="radio" 
                                    value="homeowner" 
                                    className="peer sr-only" 
                                />
                                <div className="w-full py-2.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 peer-checked:bg-white dark:peer-checked:bg-surface-highlight peer-checked:text-black dark:peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                    Homeowner
                                </div>
                            </label>
                            <label className="flex-1 text-center cursor-pointer relative z-10">
                                <input 
                                    {...register("account_type")}
                                    type="radio" 
                                    value="business" 
                                    className="peer sr-only" 
                                />
                                <div className="w-full py-2.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 peer-checked:bg-white dark:peer-checked:bg-surface-highlight peer-checked:text-black dark:peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                    Electrician / Business
                                </div>
                            </label>
                        </div>

                        {/* Name Input */}
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</span>
                            <div className="relative flex items-center">
                                <input 
                                    {...register("name")}
                                    className="w-full bg-white dark:bg-surface-dark border border-gray-300 dark:border-border-dark text-gray-900 dark:text-white text-base rounded-full h-14 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" 
                                    placeholder="e.g. Thomas Edison" 
                                    type="text" 
                                />
                                <div className="absolute right-5 text-gray-400 dark:text-[#95c6a9] flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                            </div>
                            {errors.name && <span className="text-sm text-red-500 ml-1">{errors.name.message}</span>}
                        </label>

                        {/* Email Input */}
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</span>
                            <div className="relative flex items-center">
                                <input 
                                    {...register("email")}
                                    className="w-full bg-white dark:bg-surface-dark border border-gray-300 dark:border-border-dark text-gray-900 dark:text-white text-base rounded-full h-14 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" 
                                    placeholder="name@example.com" 
                                    type="email" 
                                />
                                <div className="absolute right-5 text-gray-400 dark:text-[#95c6a9] flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                            </div>
                            {errors.email && <span className="text-sm text-red-500 ml-1">{errors.email.message}</span>}
                        </label>

                        {/* Password Input */}
                        <label className="flex flex-col gap-1.5 group">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</span>
                            <div className="relative flex items-center">
                                <input 
                                    {...register("password")}
                                    className="w-full bg-white dark:bg-surface-dark border border-gray-300 dark:border-border-dark text-gray-900 dark:text-white text-base rounded-full h-14 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500" 
                                    placeholder="Create a strong password" 
                                    type="password" 
                                />
                                <div className="absolute right-5 text-gray-400 dark:text-[#95c6a9] flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined">lock</span>
                                </div>
                            </div>
                            {errors.password && <span className="text-sm text-red-500 ml-1">{errors.password.message}</span>}
                        </label>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="mt-2 w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-background-dark text-base font-bold shadow-[0_0_20px_rgba(54,226,123,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-bold text-gray-900 dark:text-white hover:text-primary transition-colors">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
