"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <button className="flex items-center justify-center size-10 rounded-full bg-surface-highlight hover:bg-primary hover:text-[#122118] text-white transition-all duration-300">
                            <span className="material-symbols-outlined text-[20px]">
                                favorite
                            </span>
                        </button>
                        <Link href="/cart">
                            <button className="relative flex items-center justify-center size-10 rounded-full bg-surface-highlight hover:bg-primary hover:text-[#122118] text-white transition-all duration-300">
                                <span className="material-symbols-outlined text-[20px]">
                                    shopping_cart
                                </span>
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-[#122118]">
                                    2
                                </span>
                            </button>
                        </Link>
                        <Link href="/login">
                            <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-full bg-primary text-[#122118] text-sm font-bold hover:brightness-110 transition-all">
                                Sign In
                            </button>
                        </Link>
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
