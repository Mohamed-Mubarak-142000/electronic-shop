'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

// Existing schema
const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [error, setError] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            return await authService.login(values);
        },
        onSuccess: (data) => {
            router.push('/admin');
            if (data.role === 'admin') router.push('/admin');
            else router.push('/');
        },
        onError: (err: Error & { response?: { data?: { message?: string } } }) => {
            setError(err.response?.data?.message || err.message || 'Login failed');
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values);
    }

    return (
        <main className="relative flex min-h-screen w-full flex-col lg:flex-row">
            {/* Header - Absolute mobile/desktop consistent with design */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-surface-highlight px-6 lg:px-10 py-4 absolute top-0 w-full z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-3">
                    <div className="size-8 text-primary">
                        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    </div>
                    <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">ElectroShop</h2>
                </Link>
                <div className="hidden md:flex flex-1 justify-end gap-8">
                    <div className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Link href="/shop" className="hover:text-primary transition-colors">Products</Link>
                        <Link href="/b2b" className="hover:text-primary transition-colors">Trade Account</Link>
                        <Link href="/support" className="hover:text-primary transition-colors">Support</Link>
                    </div>
                    <Link href="/register">
                        <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-background-dark text-sm font-bold leading-normal hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                            <span className="truncate">Sign Up</span>
                        </button>
                    </Link>
                </div>
                {/* Mobile Menu Icon Placeholder - could implement toggle if needed */}
                <button className="md:hidden text-gray-900 dark:text-white">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </header>

            {/* Left Column: Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-dark items-center justify-center pt-[72px]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img alt="Electrical components background" className="w-full h-full object-cover opacity-40 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxdlJ5rZ3NmZHDntb8x9I3MDDL9poTTM3QL5U7lUUPHb-Cpbeg3dwehO4Ss4d3nzKXuTR37NZYKoA0ZNSQNrNH7O-b5eyagGba9CwpWgZG499xcbn-ywdR0ZUkGDf8F13zqvQVA3SunWUZW3C4w-OfpI0rSaWa0vCcc3L3Q0s-6xksaacgzc-5CoGBLuyvLVhdCYOHA5s-7yGcGiCqzJY4b7XWVo2Hmm9wkCDzvVd1HgWL9BZ6hs_nZWgrEc3pICaFYa3B7-WYnVo" />
                </div>
                {/* Abstract Glow effects */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] z-0"></div>
                {/* Content Overlay */}
                <div className="relative z-10 max-w-lg px-12 text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-8 backdrop-blur-sm border border-primary/20">
                        <span className="material-symbols-outlined text-primary text-4xl">bolt</span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Powering Your Next Big Project</h1>
                    <p className="text-gray-300 text-lg leading-relaxed">Join thousands of electricians and contractors getting exclusive trade pricing, bulk discounts, and next-day delivery on premium electrical supplies.</p>
                    <div className="mt-12 flex gap-4 justify-center">
                        <div className="flex -space-x-3">
                            <img alt="User 1" className="w-10 h-10 rounded-full border-2 border-surface-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_a2eSJu9Phkg0DpMD1KrRqUhEMsX4AdYcvcrAGKqp8CF6gtW3-vIlkGkupBGCSTdZOmeTJF_8qsylhecfQOJKzjKlqsxlLeMfPnLnVmMYjqHdhNvLuLkszJh7XfOAkd4kF8U_hBK6WVRqB-iA7GfjAJdZKTlDLILQKxggsruUgdIoI8HLA9EdySq6viVpZNxoBr0kHpAiFPdqyGGw7opAXog0cjuq39sxRZXxlewfJ4nNOYJwxww62tjAE_3jL9dR4SZt4O-EH9E" />
                            <img alt="User 2" className="w-10 h-10 rounded-full border-2 border-surface-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAybcPAt-MzG1pgZII4uxuKnM6u9kkMHO7h3TVzAByqVaJnREMF93kIRizopJfbXlZHqwhVJCY-D_qwFXKM4OMBlAalpSlRKxzFzhQ8vlRQOt7_RavDVsaeT6GBnVxCAExKOXTQJNgqF9bsVyuAe2-oHMXmzLEoeGyNWOrSKcdw_8l_amHkgG_HokkE07Ey43fZbCuDyVziY2OmKxhoZbdC-inm8VaYEfYqsBpH1zdP3sadg6HIVyXNrwsmqAn8dAB0Ilo02iJsXv4" />
                            <img alt="User 3" className="w-10 h-10 rounded-full border-2 border-surface-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASHu64l2tD0lRbligPIQT1q6jawwMtQv9aINFBF3HZPRS0P_DCbvy4EzoJFUaHm8zocT5l5uhs0JhjnVr5ueijWnWNk1ev1yeHX99cM59efcrSOHTbAxN7K9UMuAKK36T8Ov7cg1mLM2jtXIZezpEmZ76WV9Bl2BeB27LFqvRWZBiHp0PKXF5ZU8eZTCOfHeOHnJxjc7Akg7PtF4baG6tau2tAAkmIJjpb7cGyMgKelJW_fE6CrYtrYPKkzRTUDFUhahaipCyStIg" />
                            <div className="w-10 h-10 rounded-full border-2 border-surface-dark bg-gray-700 flex items-center justify-center text-xs text-white font-medium">+2k</div>
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <div className="flex text-yellow-400 text-xs">
                                {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-[16px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                            </div>
                            <span className="text-gray-400 text-xs font-medium pl-1">Trusted by pros</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-background-light dark:bg-background-dark pt-[100px] lg:pt-0">
                <div className="w-full max-w-[480px] flex flex-col gap-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-gray-900 dark:text-white tracking-tight text-3xl md:text-4xl font-bold leading-tight mb-2">Welcome Back</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Log in to access your trade dashboard.</p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        {/* Email Field */}
                        <label className="flex flex-col gap-2">
                            <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold ml-1">Email Address</span>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">mail</span>
                                </div>
                                <input
                                    {...form.register("email")}
                                    className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#95c6a9] h-14 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                                    placeholder="name@company.com"
                                    type="email"
                                    required
                                />
                            </div>
                            {form.formState.errors.email && <span className="text-red-500 text-sm ml-1">{form.formState.errors.email.message}</span>}
                        </label>

                        {/* Password Field */}
                        <label className="flex flex-col gap-2">
                            <div className="flex justify-between items-center ml-1">
                                <span className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Password</span>
                                <Link href="/forgot-password" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">Forgot Password?</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
                                </div>
                                <input
                                    {...form.register("password")}
                                    className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#95c6a9] h-14 pl-12 pr-12 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                                    placeholder="Enter your password"
                                    type="password"
                                    required
                                />
                            </div>
                            {form.formState.errors.password && <span className="text-red-500 text-sm ml-1">{form.formState.errors.password.message}</span>}
                        </label>

                        {/* Remember Me */}
                        <div className="flex items-center gap-3 ml-1 mt-1">
                            <div className="relative flex items-center">
                                <input className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark checked:bg-primary checked:border-primary focus:ring-primary/20 transition-all" id="remember" type="checkbox" />
                                <span className="absolute text-background-dark opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                    <span className="material-symbols-outlined" style={{ fontSize: "16px", fontWeight: "bold" }}>check</span>
                                </span>
                            </div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none" htmlFor="remember">Remember this device</label>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-full bg-primary text-background-dark h-14 text-base font-bold tracking-wide hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
                        >
                            {mutation.isPending ? 'Signing in...' : 'Sign In'}
                        </button>

                        {/* Social Logins Omitted for brevity as backend support unknown, but visual placeholder could be added if requested. Keeping consistent with functional logic which is Email/Pass only for now, but design has them. I will add visual placeholders. */}

                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-gray-200 dark:border-border-dark"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">or continue with</span>
                            <div className="flex-grow border-t border-gray-200 dark:border-border-dark"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark h-12 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#23402f] transition-colors">
                                {/* Google Icon SVG */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                                Google
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark h-12 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#23402f] transition-colors">
                                {/* Apple Icon */}
                                <svg className="w-5 h-5 dark:fill-white fill-gray-900" viewBox="0 0 24 24">
                                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.15-.04-.21.02-1.35.584-2.75 1.38-3.68.777-.92 2.056-1.55 3.01-1.55 0 .05.11.08.114.82zM12.42 5.86c.325 0 .913.32 1.718.32 1.323 0 2.482-.9 3.23-1.07.72-.17 2.686.06 3.98 2.05-.13.08-2.28 1.41-2.28 4.3 0 3.12 2.47 4.54 2.57 4.61-.17.44-1.02 2.45-2.06 4.22-.64 1.08-1.57 2.13-2.73 2.13-1.09 0-1.48-.75-3.41-.75-1.92 0-2.52.75-3.56.75-1.22 0-2.3-1.42-3.23-2.92-1.9-3.05-3.1-8.15-1.11-11.66 1-1.76 2.94-2.65 4.75-2.65.66 0 1.25.26 1.83.61z"></path>
                                </svg>
                                Apple
                            </button>
                        </div>

                        <div className="flex justify-center mt-6">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Don&apos;t have an account? <Link href="/register" className="text-primary font-semibold hover:underline">Register now</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
