'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useLanguageStore } from '../store/useLanguageStore';
import { useEffect } from 'react';
import NewProductDrawer from '../components/NewProductDrawer';

const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
    const { language, direction } = useLanguageStore();

    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = language;
    }, [language, direction]);

    return <>{children}</>;
};

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <LanguageWrapper>
                {children}
                <NewProductDrawer />
            </LanguageWrapper>
            <Toaster position="top-center" reverseOrder={false} />
        </QueryClientProvider>
    );
}
