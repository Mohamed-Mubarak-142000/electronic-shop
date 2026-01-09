'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../hooks/useSocket';
import { X } from 'lucide-react';
import { productService } from '../services/productService';
import { useTranslation } from '../hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';

interface Product {
    _id: string;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    price: number;
    images: string[];
}

export default function NewProductDrawer() {
    const [queue, setQueue] = useState<Product[]>([]);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const socket = useSocket();
    const { language, t } = useTranslation();
    const { formatPrice } = useCurrency();

    useEffect(() => {
        if (!socket) return;

        socket.on('new_product', (product: Product) => {
            const shownProducts = JSON.parse(localStorage.getItem('shownProducts') || '[]');
            if (!shownProducts.includes(product._id)) {
                setQueue(prev => [...prev, product]);
            }
        });

        return () => {
            socket.off('new_product');
        };
    }, [socket]);

    // Handle offline cases: Fetch latest 5 on mount
    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await productService.getProducts({ limit: 5, sort: '-createdAt' });
                const latestProducts = response.products;
                const shownProducts = JSON.parse(localStorage.getItem('shownProducts') || '[]');

                const newProducts = latestProducts.filter((p: Product) => !shownProducts.includes(p._id));
                if (newProducts.length > 0) {
                    setQueue(prev => [...prev, ...newProducts]);
                }
            } catch (error) {
                console.error('Failed to fetch latest products:', error);
            }
        };

        fetchLatest();
    }, []);

    useEffect(() => {
        if (!currentProduct && queue.length > 0) {
            const next = queue[0];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentProduct(next);
            setQueue(prev => prev.slice(1));

            // Mark as shown
            const shownProducts = JSON.parse(localStorage.getItem('shownProducts') || '[]');
            localStorage.setItem('shownProducts', JSON.stringify([...shownProducts, next._id]));
        }
    }, [queue, currentProduct]);

    useEffect(() => {
        if (currentProduct) {
            const timer = setTimeout(() => {
                setCurrentProduct(null);
            }, 30000); // 30 seconds

            return () => clearTimeout(timer);
        }
    }, [currentProduct]);

    return (
        <AnimatePresence>
            {currentProduct && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-6 rounded-t-3xl"
                >
                    <div className="max-w-2xl mx-auto flex gap-6">
                        <div className="w-32 h-32 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden">
                            {currentProduct.images?.[0] ? (
                                <img
                                    src={currentProduct.images[0]}
                                    alt={currentProduct.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-4xl">image</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">
                                        {language === 'ar' ? 'منتج جديد!' : 'New Product!'}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {language === 'ar' ? currentProduct.nameAr : currentProduct.name}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setCurrentProduct(null)}
                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-2">
                                {language === 'ar' ? currentProduct.descriptionAr : currentProduct.description}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                    {formatPrice(currentProduct.price)}
                                </span>
                                <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all hover:scale-105 active:scale-95 font-medium">
                                    {t('product.addToCart')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Auto-close progress bar */}
                    <motion.div
                        initial={{ width: '100%' }}
                        animate={{ width: 0 }}
                        transition={{ duration: 30, ease: 'linear' }}
                        className="absolute bottom-0 left-0 h-1 bg-primary-500/30"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
