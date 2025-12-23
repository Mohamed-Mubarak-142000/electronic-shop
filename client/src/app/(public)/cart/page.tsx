"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
    const { cartItems, updateQuantity, removeItem } = useCartStore();
    const [activeTab, setActiveTab] = useState("cart");
    const [isLoaded, setIsLoaded] = useState(false);

    // This is to avoid hydration mismatch with localstorage persistence
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleUpdateQuantity = (id: string, delta: number) => {
        updateQuantity(id, delta);
    };

    const handleRemoveItem = (id: string) => {
        removeItem(id);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen">
                <div className="w-full max-w-[1440px] px-4 md:px-10 py-10 flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen">
                <div className="w-full max-w-[1440px] px-4 md:px-10 py-10">
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                        <div className="size-24 rounded-full bg-slate-100 dark:bg-surface-dark flex items-center justify-center text-slate-400 mb-6">
                            <span className="material-symbols-outlined text-5xl">shopping_cart</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Your cart is empty</h1>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                            Looks like you haven't added anything to your cart yet. Explore our categories and find something you love!
                        </p>
                        <Link href="/shop">
                            <button className="bg-primary hover:bg-green-400 text-surface-dark font-black px-8 py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                                Go Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen">
            <div className="w-full max-w-[1440px] px-4 md:px-10 py-8 lg:py-12">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Shopping Cart</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
                            You have {cartItems.length} items in your cart ready for checkout.
                        </p>
                    </div>
                    {/* Tabs */}
                    <div className="inline-flex bg-slate-200 dark:bg-surface-dark p-1 rounded-full">
                        <button
                            onClick={() => setActiveTab("cart")}
                            className={`px-6 py-2 rounded-full shadow-sm font-bold text-sm transition-all ${activeTab === "cart"
                                ? "bg-white dark:bg-primary text-slate-900 dark:text-surface-dark"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            My Cart ({cartItems.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("wishlist")}
                            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${activeTab === "wishlist"
                                ? "bg-white dark:bg-primary text-slate-900 dark:text-surface-dark shadow-sm font-bold"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            Wishlist (0)
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* Cart Items Section */}
                    <div className="flex-1 w-full space-y-4">
                        {/* Table Header (Hidden on Mobile) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-gray-200 dark:border-surface-highlight">
                            <div className="col-span-6">Product Details</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white dark:bg-surface-dark rounded-xl p-4 md:p-6 shadow-sm border border-transparent dark:border-surface-highlight hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                    {/* Product Info */}
                                    <div className="md:col-span-6 flex gap-4">
                                        <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gray-100 dark:bg-black/20 overflow-hidden relative">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            {item.lowStock ? (
                                                <div className="text-xs text-orange-400 font-bold tracking-wide uppercase mb-1">Low Stock</div>
                                            ) : (
                                                <div className="text-xs text-primary font-bold tracking-wide uppercase mb-1">In Stock</div>
                                            )}
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-1">{item.name}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                                            <p className="text-xs text-slate-400 mt-1">{item.sku && `SKU: ${item.sku}`}</p>
                                        </div>
                                    </div>

                                    {/* Price (Mobile: hidden, Desktop: visible) */}
                                    <div className="hidden md:block md:col-span-2 text-center">
                                        <p className="text-slate-900 dark:text-white font-medium">${item.price.toFixed(2)}</p>
                                    </div>

                                    {/* Quantity Control */}
                                    <div className="flex justify-between items-center md:justify-center md:col-span-2">
                                        <div className="md:hidden text-slate-900 dark:text-white font-bold">${item.price.toFixed(2)}</div>
                                        <div className="flex items-center bg-gray-100 dark:bg-black/20 rounded-full">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">remove</span>
                                            </button>
                                            <input
                                                className="w-10 bg-transparent border-0 text-center text-sm font-bold text-slate-900 dark:text-white focus:ring-0 p-0 appearance-none"
                                                type="number"
                                                value={item.quantity}
                                                readOnly
                                            />
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">add</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total & Actions */}
                                    <div className="flex justify-between items-center md:justify-end md:col-span-2 gap-4">
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className="flex gap-1 md:absolute md:top-4 md:right-4 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                aria-label="Remove item"
                                                className="p-1.5 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                            <button
                                                aria-label="Save for later"
                                                className="p-1.5 text-slate-400 hover:text-primary rounded-full hover:bg-primary/10 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Saved for Later (Mini) - Placeholder for now */}
                        <div className="pt-8">
                            <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-4 group">
                                <span>Saved for Later (0 Items)</span>
                                <span className="material-symbols-outlined text-[18px] transform group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </button>
                            {/* Small Hint/Upsell */}
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-4 flex gap-4 items-center">
                                <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                        <span className="font-bold">Shipping Tip:</span> Get free priority shipping on orders over $150.
                                    </p>
                                </div>
                                <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Details</button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="w-full lg:w-[380px] shrink-0 sticky top-24">
                        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-surface-highlight p-6 md:p-8 flex flex-col gap-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                    <span className="text-sm">Subtotal</span>
                                    <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                    <span className="text-sm">Estimated Tax (8%)</span>
                                    <span className="font-bold text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                                    <span className="text-sm">Shipping</span>
                                    <span className="font-bold text-primary">Free</span>
                                </div>
                            </div>
                            <div className="border-t border-dashed border-slate-200 dark:border-surface-highlight my-2"></div>
                            <div className="flex justify-between items-end">
                                <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                                <div className="text-right">
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-normal">USD</span>
                                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            {/* Promo Code */}
                            <div className="mt-2">
                                <label className="sr-only" htmlFor="promo">
                                    Promo Code
                                </label>
                                <div className="flex rounded-full bg-slate-100 dark:bg-black/20 border border-transparent focus-within:border-primary/50 transition-colors p-1 pl-4">
                                    <input
                                        className="bg-transparent border-none text-sm w-full text-slate-900 dark:text-white placeholder-slate-500 focus:ring-0 px-0"
                                        id="promo"
                                        placeholder="Enter promo code"
                                        type="text"
                                    />
                                    <button className="bg-slate-200 dark:bg-surface-highlight hover:bg-slate-300 dark:hover:bg-primary dark:hover:text-surface-dark text-slate-600 dark:text-white px-4 py-2 rounded-full text-xs font-bold transition-all">
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <button className="w-full bg-primary hover:bg-green-400 text-surface-dark font-black text-lg py-4 rounded-full shadow-[0_0_20px_rgba(54,226,123,0.3)] hover:shadow-[0_0_30px_rgba(54,226,123,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-4">
                                <span>Checkout</span>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            {/* Trust Signals */}
                            <div className="flex justify-center gap-6 mt-2 pt-4 border-t border-slate-100 dark:border-surface-highlight">
                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400" title="Secure Payment">
                                    <span className="material-symbols-outlined text-[16px]">lock</span>
                                    <span>Secure</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400" title="Fast Shipping">
                                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                                    <span>Express</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400" title="Warranty">
                                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                                    <span>Warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
