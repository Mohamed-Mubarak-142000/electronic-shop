"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-hot-toast";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useCartStore((state) => state.cartItems);
    const wishlistItems = useWishlistStore((state) => state.wishlistItems);
    const user = useAuthStore((state) => state.user);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistCount = wishlistItems.length;

    return (
        <div className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-surface-highlight">
            <div className="flex items-center justify-between px-4 py-3 lg:px-10 max-w-[1440px] mx-auto w-full">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 text-white group">
                        <div className="size-8 text-primary">
                            <span
                                className="material-symbols-outlined text-4xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                bolt
                            </span>
                        </div>
                        <h2 className="text-white text-xl font-bold tracking-tight">
                            ElectroShop
                        </h2>
                    </Link>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex items-center">
                        <label className="relative flex items-center min-w-[320px]">
                            <span className="absolute left-4 text-[#95c6a9]">
                                <span className="material-symbols-outlined">search</span>
                            </span>
                            <input
                                className="w-full bg-surface-highlight text-white placeholder:text-[#95c6a9] rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:outline-none border-none text-sm transition-all hover:bg-[#2d543c]"
                                placeholder="Search bulbs, switches, tools..."
                                type="text"
                            />
                        </label>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    {/* Links (Desktop) */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link
                            href="/shop"
                            className="text-sm font-medium text-white hover:text-primary transition-colors"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/deals"
                            className="text-sm font-medium text-white hover:text-primary transition-colors"
                        >
                            Deals
                        </Link>
                        <Link
                            href="/b2b"
                            className="text-sm font-medium text-white hover:text-primary transition-colors"
                        >
                            B2B
                        </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Link href="/wishlist">
                            <button className="relative flex items-center justify-center size-10 rounded-full bg-surface-highlight hover:bg-primary hover:text-[#122118] text-white transition-all duration-300">
                                <span className="material-symbols-outlined text-[20px]">
                                    favorite
                                </span>
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>
                        </Link>
                        <Link href="/cart">
                            <button className="relative flex items-center justify-center size-10 rounded-full bg-surface-highlight hover:bg-primary hover:text-[#122118] text-white transition-all duration-300">
                                <span className="material-symbols-outlined text-[20px]">
                                    shopping_cart
                                </span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-[#122118]">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </Link>
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="hidden md:block text-white text-sm font-medium">
                                    Hello, {user.name.split(' ')[0]}
                                </span>
                                <button
                                    onClick={() => {
                                        const { logout } = useAuthStore.getState();
                                        const { clearCart } = useCartStore.getState();
                                        logout();
                                        clearCart();
                                        toast.success("Logged out successfully");
                                    }}
                                    className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full bg-surface-highlight text-white text-sm font-bold hover:bg-red-500/20 hover:text-red-500 transition-all border border-transparent hover:border-red-500/50"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login">
                                <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full bg-primary text-[#122118] text-sm font-bold hover:brightness-110 transition-all">
                                    Sign In
                                </button>
                            </Link>
                        )}
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-white ml-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Simple/Basic implementation for now as per design direction) */}
            {isMenuOpen && (
                <div className="lg:hidden bg-background-dark border-t border-surface-highlight px-4 py-4 space-y-4">
                    <Link
                        href="/shop"
                        className="block text-sm font-medium text-white hover:text-primary transition-colors"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/deals"
                        className="block text-sm font-medium text-white hover:text-primary transition-colors"
                    >
                        Deals
                    </Link>
                    <Link
                        href="/b2b"
                        className="block text-sm font-medium text-white hover:text-primary transition-colors"
                    >
                        B2B
                    </Link>
                    <Link
                        href="/login"
                        className="block text-sm font-medium text-primary hover:text-primary transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            )}
        </div>
    );
}
