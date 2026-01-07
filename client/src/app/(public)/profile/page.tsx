'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { userService } from '../../../services/userService';
import { toast } from 'react-hot-toast';
import MapSelector from '../../../components/MapSelector';
import { useTranslation } from '../../../hooks/useTranslation';

export default function ProfilePage() {
    const { user, login } = useAuthStore();
    const { t, language } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
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
        skills: [] as any[]
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile();
                setFormData({
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
                });
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
            login(updatedUser);
            toast.success(language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div className="p-20 text-center">{t('auth.login')}</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
                {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-semibold mb-4">{language === 'ar' ? 'المعلومات الأساسية' : 'Basic Info'}</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('auth.name')}</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('auth.email')}</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Info */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-semibold mb-4">{language === 'ar' ? 'العنوان' : 'Address'}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{language === 'ar' ? 'الشارع' : 'Street'}</label>
                                <input
                                    type="text"
                                    value={formData.address.street}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{language === 'ar' ? 'المدينة' : 'City'}</label>
                                <input
                                    type="text"
                                    value={formData.address.city}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{language === 'ar' ? 'الدولة' : 'Country'}</label>
                                <input
                                    type="text"
                                    value={formData.address.country}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Professional Info */}
                    {(user.role === 'admin' || user.role === 'business') && (
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-semibold mb-4">{language === 'ar' ? 'معلومات مهنية' : 'Professional Info'}</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">{language === 'ar' ? 'المسمى الوظيفي (EN)' : 'Job Title (EN)'}</label>
                                        <input
                                            type="text"
                                            value={formData.jobTitle}
                                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">{language === 'ar' ? 'المسمى الوظيفي (AR)' : 'Job Title (AR)'}</label>
                                        <input
                                            type="text"
                                            value={formData.jobTitleAr}
                                            onChange={(e) => setFormData({ ...formData, jobTitleAr: e.target.value })}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-right"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">{language === 'ar' ? 'سنوات الخبرة' : 'Experience Years'}</label>
                                        <input
                                            type="number"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                                            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 pt-6">
                                        <input
                                            type="checkbox"
                                            id="isHiring"
                                            checked={formData.isHiring}
                                            onChange={(e) => setFormData({ ...formData, isHiring: e.target.checked })}
                                            className="rounded border-slate-300 text-primary-600"
                                        />
                                        <label htmlFor="isHiring" className="text-sm font-medium cursor-pointer">{language === 'ar' ? 'متاح للتوظيف' : 'Available for Hire'}</label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">{language === 'ar' ? 'نبذة (EN)' : 'Bio (EN)'}</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent h-24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">{language === 'ar' ? 'نبذة (AR)' : 'Bio (AR)'}</label>
                                    <textarea
                                        value={formData.bioAr}
                                        onChange={(e) => setFormData({ ...formData, bioAr: e.target.value })}
                                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent h-24 text-right"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Location Info */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-semibold mb-4">{language === 'ar' ? 'الموقع الجغرافي' : 'Geographic Location'}</h2>
                        <p className="text-sm text-slate-500 mb-4">{language === 'ar' ? 'انقر على الخريطة لتحديد موقعك' : 'Click on the map to set your location'}</p>
                        <MapSelector
                            value={formData.location}
                            onChange={(loc) => setFormData({ ...formData, location: loc })}
                        />
                        <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                Lat: {formData.location.lat.toFixed(4)}
                            </div>
                            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                Lng: {formData.location.lng.toFixed(4)}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-background-dark rounded-2xl font-black transition-all shadow-lg hover:scale-[1.02] disabled:opacity-50"
                    >
                        {loading ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
                    </button>
                </div>
            </form>
        </div>
    );
}
