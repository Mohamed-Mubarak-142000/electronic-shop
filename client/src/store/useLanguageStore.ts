import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'ar';

interface LanguageState {
    language: Language;
    setLanguage: (lang: Language) => void;
    direction: 'ltr' | 'rtl';
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: 'ar',
            direction: 'rtl',
            setLanguage: (lang) => set({
                language: lang,
                direction: lang === 'ar' ? 'rtl' : 'ltr'
            }),
        }),
        {
            name: 'language-storage',
        }
    )
);
