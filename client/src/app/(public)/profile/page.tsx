'use client';

import { AxiosError } from 'axios';

import { useState, useEffect, useMemo } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { userService } from '../../../services/userService';
import { toast } from 'react-hot-toast';
import MapSelector from '../../../components/MapSelector';
import { useTranslation } from '../../../hooks/useTranslation';

interface ProfileFormData {
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    };
    location: {
        lat: number;
        lng: number;
    };
    jobTitle: string;
    jobTitleAr: string;
    bio: string;
    bioAr: string;
    experience: number;
    isHiring: boolean;
    skills: string[];
}

export default function ProfilePage() {
    const { user, login } = useAuthStore();
    const { t, language, dir } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState<ProfileFormData | null>(null);
    const [formData, setFormData] = useState<ProfileFormData>({
        name: '',
        email: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        },
        location: {
            lat: 0,
            lng: 0
        },
        jobTitle: '',
        jobTitleAr: '',
        bio: '',
        bioAr: '',
        experience: 0,
        isHiring: false,
        skills: [] as string[]
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile();
                const profileData = {
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    address: {
                        street: data.address?.street || '',
                        city: data.address?.city || '',
                        state: data.address?.state || '',
                        country: data.address?.country || '',
                        zip: data.address?.zip || ''
                    },
                    location: {
                        lat: data.location?.lat || 0,
                        lng: data.location?.lng || 0
                    },
                    jobTitle: data.jobTitle || '',
                    jobTitleAr: data.jobTitleAr || '',
                    bio: data.bio || '',
                    bioAr: data.bioAr || '',
                    experience: data.experience || 0,
                    isHiring: data.isHiring || false,
                    skills: data.skills || []
                };
                setFormData(profileData);
                setInitialData(profileData);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedUser = await userService.updateProfile(formData);
            // Ensure token is preserved if not returned
            login({ ...updatedUser, token: updatedUser.token || user?.token || '' });
            toast.success(language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully');
        } catch (error: unknown) {
            toast.error((error as AxiosError<{ message: string }>).response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const hasChanges = useMemo(() => {
        return JSON.stringify(formData) !== JSON.stringify(initialData);
    }, [formData, initialData]);

    // Show loading spinner while checking auth or fetching initial data
    if (!user || (!initialData && user)) return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background-light dark:bg-background-dark">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="flex flex-col items-center w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen" dir={dir}>
            <div className="w-full max-w-[1000px] px-4 py-8 lg:py-12">
                <div className="mb-8 items-center justify-between gap-6 flex flex-col md:flex-row">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                            {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
                            {language === 'ar' ? 'إدارة معلوماتك الشخصية' : 'Manage your personal information'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Top Row: Basic Info & Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Basic Info */}
                        <div className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-border-dark h-full">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Info'}
                            </h2>
                            <div className="space-y-5">
                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{t('auth.name')}</span>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-4 rtl:pr-4 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">person</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 h-14 pl-12 pr-4 rtl:pr-12 rtl:pl-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                                        />
                                    </div>
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{t('auth.email')}</span>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-4 rtl:pr-4 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 transition-colors">mail</span>
                                        </div>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 h-14 pl-12 pr-4 rtl:pr-12 rtl:pl-4 cursor-not-allowed"
                                        />
                                    </div>
                                </label>

                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</span>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-4 rtl:pr-4 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">phone</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 h-14 pl-12 pr-4 rtl:pr-12 rtl:pl-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Address Info */}
                        <div className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-border-dark h-full">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">home</span>
                                {language === 'ar' ? 'العنوان' : 'Address'}
                            </h2>
                            <div className="space-y-5">
                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'الشارع' : 'Street'}</span>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-4 rtl:pr-4 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">signpost</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.address.street}
                                            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                                            className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-14 pl-12 pr-4 rtl:pr-12 rtl:pl-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                        />
                                    </div>
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'المدينة' : 'City'}</span>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-4 rtl:pr-4 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">location_city</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.address.city}
                                                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                                                className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-14 pl-12 pr-4 rtl:pr-12 rtl:pl-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                            />
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'الدولة' : 'Country'}</span>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-4 rtl:pr-4 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">public</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={formData.address.country}
                                                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                                                className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-14 pl-12 pr-4 rtl:pr-12 rtl:pl-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Info */}
                    {(user.role === 'admin' || user.role === 'business') && (
                        <div className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-border-dark w-full">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">work</span>
                                {language === 'ar' ? 'معلومات مهنية' : 'Professional Info'}
                            </h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'المسمى الوظيفي (EN)' : 'Job Title (EN)'}</span>
                                        <input
                                            type="text"
                                            value={formData.jobTitle}
                                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                            className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'المسمى الوظيفي (AR)' : 'Job Title (AR)'}</span>
                                        <input
                                            type="text"
                                            value={formData.jobTitleAr}
                                            onChange={(e) => setFormData({ ...formData, jobTitleAr: e.target.value })}
                                            className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-right"
                                        />
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'سنوات الخبرة' : 'Experience Years'}</span>
                                        <input
                                            type="number"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                                            className="w-full rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                        />
                                    </label>
                                    <div className="flex items-center gap-3 pt-8 px-2">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                id="isHiring"
                                                checked={formData.isHiring}
                                                onChange={(e) => setFormData({ ...formData, isHiring: e.target.checked })}
                                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-dark checked:bg-primary checked:border-primary focus:ring-primary/20 transition-all"
                                            />
                                            <span className="absolute text-background-dark opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                                <span className="material-symbols-outlined" style={{ fontSize: "16px", fontWeight: "bold" }}>check</span>
                                            </span>
                                        </div>
                                        <label htmlFor="isHiring" className="text-sm font-semibold cursor-pointer text-slate-700 dark:text-white">{language === 'ar' ? 'متاح للتوظيف' : 'Available for Hire'}</label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'نبذة (EN)' : 'Bio (EN)'}</span>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            className="w-full rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-24 p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                        />
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-semibold ml-1">{language === 'ar' ? 'نبذة (AR)' : 'Bio (AR)'}</span>
                                        <textarea
                                            value={formData.bioAr}
                                            onChange={(e) => setFormData({ ...formData, bioAr: e.target.value })}
                                            className="w-full rounded-2xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-24 p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-right"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Location Info */}
                    <div className="bg-white dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-border-dark w-full">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            {language === 'ar' ? 'الموقع الجغرافي' : 'Geographic Location'}
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">{language === 'ar' ? 'ابحث عن عنوانك أو انقر على الخريطة لتحديد موقعك' : 'Search for your address or click on the map to set your location'}</p>
                        
                        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-gray-700">
                            <MapSelector
                                value={formData.location}
                                onChange={(loc) => setFormData({ ...formData, location: loc })}
                            />
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={loading || !hasChanges}
                                className="w-full py-4 bg-primary hover:bg-green-400 text-background-dark rounded-full font-black text-lg transition-all shadow-lg hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:shadow-none"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin material-symbols-outlined text-xl">progress_activity</span>
                                        {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                                    </span>
                                ) : (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
