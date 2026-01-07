"use client";

import { useLanguageStore } from '../store/useLanguageStore';
import { translations } from '../lib/translations';

export const useTranslation = () => {
    const { language } = useLanguageStore();

    const t = (path: string) => {
        const keys = path.split('.');
        let current: any = translations[language];

        for (const key of keys) {
            if (current && current[key]) {
                current = current[key];
            } else {
                return path;
            }
        }

        return current;
    };

    return { t, language, direction: language === 'ar' ? 'rtl' : 'ltr' };
};
