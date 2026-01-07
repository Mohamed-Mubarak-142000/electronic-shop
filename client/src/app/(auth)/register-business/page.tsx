'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { toast } from 'react-hot-toast';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export default function RegisterBusinessPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        companyName: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { t, language } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authService.registerBusiness(formData);
            toast.success(res.message);
            router.push(`/verify-otp?email=${formData.email}`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-dark py-20 px-4">
            <div className="max-w-2xl mx-auto bg-surface-dark p-8 md:p-12 rounded-[2.5rem] border border-surface-highlight shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                        {language === 'ar' ? 'تسجيل حساب أعمال' : 'Register Business Account'}
                    </h1>
                    <p className="text-[#95c6a9]">
                        {language === 'ar' ? 'انضم إلى شبكة المحترفين لدينا واحصل على مزايا حصرية' : 'Join our professional network and get exclusive benefit'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</label>
                        <input
                            type="text" required
                            className="w-full bg-surface-highlight text-white rounded-2xl py-3 px-5 focus:ring-2 focus:ring-primary outline-none transition-all border-none shadow-inner"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'اسم الشركة' : 'Company Name'}</label>
                        <input
                            type="text" required
                            className="w-full bg-surface-highlight text-white rounded-2xl py-3 px-5 focus:ring-2 focus:ring-primary outline-none transition-all border-none shadow-inner"
                            placeholder="Electric Solutions Ltd."
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'البريد الإلكتروني للعمل' : 'Business Email'}</label>
                        <input
                            type="email" required
                            className="w-full bg-surface-highlight text-white rounded-2xl py-3 px-5 focus:ring-2 focus:ring-primary outline-none transition-all border-none shadow-inner"
                            placeholder="business@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                        <input
                            type="tel" required
                            className="w-full bg-surface-highlight text-white rounded-2xl py-3 px-5 focus:ring-2 focus:ring-primary outline-none transition-all border-none shadow-inner"
                            placeholder="+1 234 567 890"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'كلمة المرور' : 'Password'}</label>
                        <input
                            type="password" required
                            className="w-full bg-surface-highlight text-white rounded-2xl py-3 px-5 focus:ring-2 focus:ring-primary outline-none transition-all border-none shadow-inner"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">{language === 'ar' ? 'عنوان العمل' : 'Business Address'}</label>
                        <textarea
                            className="w-full bg-surface-highlight text-white rounded-2xl py-3 px-5 focus:ring-2 focus:ring-primary outline-none transition-all border-none shadow-inner h-24"
                            placeholder="123 Voltage St, Circuit City"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div className="col-span-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-background-dark font-black rounded-2xl text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20 disabled:opacity-50"
                        >
                            {loading ? '...' : (language === 'ar' ? 'إنشاء حساب أعمال' : 'Create Business Account')}
                        </button>
                    </div>

                    <div className="col-span-2 text-center mt-4">
                        <p className="text-gray-400">
                            {language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'} {' '}
                            <Link href="/login" className="text-primary font-bold hover:underline">
                                {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
