"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Mock Data
const product = {
    id: "1",
    name: "Lumina Smart LED Bulb",
    subtitle: "10W RGBW - E26 Base",
    price: 12.99,
    originalPrice: 15.99,
    description: "Control your lighting from anywhere with the Lumina Smart LED Bulb. Compatible with Alexa and Google Home, this energy-efficient bulb offers 16 million colors and adjustable white temperatures to set the perfect mood for any occasion.",
    rating: 5,
    reviewCount: 128,
    images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWmhsWik6B_QyX6UPcFZBqXJicKi7ivJBKO3z9YHHSp-dRRlNjTFCgQg6rey_eVMAWuYbosL-uKjdLXhpWfyFslwXsroomgP3RjtvjVs8qnb2M8_GsBDVZnuzt9cLY38KSamGv0klMqf5FR89GHj7uK1Syf8nmzKvqFNAWW7STS1qw9UHVyRl4LSL9DI2n7Om-iUWEPw3d5IEjwqHJyjbFr8v0cJr0tX9s1El2wgXPvcLMEqKgcb8yXrUBeqjWJ8QiJ_6IQ0bSFLo",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB36aJS-FpswIMCVr4k3V3FnZfRHgH9bLVW-9p5kr9WQZcU4iKfExFizDctxOKEFi5tAMFNC8TUpDDQ825-ajmTyCSGR20ZyODeYWmU3ezwMv9zbEQ3xxa58TkYiNcZZgAiah7uON7_ysElbOqQ7abj3YbWwt2_TRHdpcRWTaO-Zk75zKzov_32HM8R-gmcItTRp5BIQ2lE6uK4w2f8GZM8fIdxYFpyIQW1utULlVX8HVMV4P9FhUzU-sI_POiaBab-8RgtMY9bQqE",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBo-hk2YTxCEyOk83af7M-tzo1geHCJStSHyDckCLJJ8NYIxDQe2jw1bgB-VWdhXPA86GdYI5I5bkYZUwJDi_hmfVTcRBdtv_iPWV4ezh2HtQOtPQ6eeOe3i1mRcJIfZ4BiiJnYbsXy5bAQJOcUPnS9OcsbVFBzXbP-nptnwrsLy5FnuPyYboDnTcZCffHXyOA1t2wKRkZdicxcEcXycYZg8ZpMwjLagA0wXEfg6EFl3KBGGEB58n1AhalkXY4Wtf1vugVMbfuXXxY",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCylA9Ld2SZJ7XuRKh7KECOL4J0NfhKxl_xWmdTH-sl5K-mqaw8n_Vdctk-aWdLVhyuVHRa2cEjseUEJ_hmco8_2wpNZp0W3Ckqpqo-hddi_qNB3LbaDXYrxUS7Ktj1_aCMeea5xTvHcbUgsf7topm0c19SZQ5U3rW9w3UeQpFVNRZfvsFncN9qingjtGTNr0dE_LU8Yf6vA9peiOh7Rs3RIDbB1URzFrlQi77_DB9Qx9NBVvZyZEjFUgCFM09vJ4D-CsS1GsH95dY",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFusEhB5OG7jqDsXWb5EexvK8wGQDmfhiRouj3jdRu05zgNbuVo4zGR_97Ge0_UsdXYFRG3Qyygkek_mEAFB8u5zkBz5xptU-8L4Vj0yKrRmnrnbzQEMy13i7k6yvlafGz5eX0T690XkXWS_AtKkujb8-WFCBhouNpaRxSd5TC1t1JLuSh6e2dSII4ZN3GDvHSEqatSc5TXjEh60Fw9OikzlFlXPiUS6cEbDOY46fyVGhY5e1n0JYrUUcStJA6P0hU9MAhuJM0iC8",
    ],
    specs: [
        { label: "Brand", value: "Lumina" },
        { label: "Model", value: "LM-Smart-E26" },
        { label: "Base Type", value: "E26 (Standard)" },
        { label: "Wattage", value: "10 Watts" },
        { label: "Voltage", value: "110V - 240V" },
        { label: "Lifespan", value: "25,000 Hours" },
        { label: "Material", value: "Plastic / Aluminum" },
    ],
    reviews: [
        { user: "John Doe", date: "2 days ago", rating: 5, content: "I installed these in my garage and the difference is night and day. The app is super easy to use and the colors are vibrant. Highly recommend!" },
        { user: "Alice Smith", date: "1 week ago", rating: 4.5, content: "The bulbs themselves are great quality, but I had some trouble connecting them to my older router. Once connected, they work flawlessly." },
        { user: "Mike Ross", date: "3 weeks ago", rating: 5, content: "Integration with Google Home was seamless. I love the 'Reading' mode preset. Will definitely buy more for the other rooms." },
    ]
};

const relatedProducts = [
    {
        name: "Industrial Pendant Light",
        price: 45.00,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKxzom9xnLXlsp8E7BIjui3OXb7zNQp0Mhg7xeBo-mfOjLJI44FJQjfjW2zovjs1cd3qE-JT7oeiaKmOe0rmb2ALrSA99JiffTvdCLdnbuslMkzHofUr6X9Ej7nnW-O4dBXXjz7ddhhDeCIJdfH1Gt44kCcG5KMhGEP92iXov1bSb9SosSnUL6lwsBFsGZfUufGZUbvXRu-oQfFcBaOblXcrS14UvfxDKMpUOkDbwPG3VbD0FzjEQYBq9FdBrJHkoyJbN3Pwu8q7E"
    },
    {
        name: "AeroSmart Ceiling Fan",
        price: 129.99,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZJrH6ItX7vVFpguytQY3QpUBgUhseklIdNjQGK7Un2iY_t77auzpp8ZyQca7MYaVQwvNfEwPYoisDPi_l4GkyzZQ87snWQuWmfQGaTsJFmVW44W9RIYDNITshD9bV2H7AXte-5AVz0fDYlO9EBlUMCLsJii9lr7HKxTV-l6eM5CXMrEGbqAw2X5sX1RbxSgf5MJCr7wVrRAn6CImw8VzHeRkkkE7CzMwrpRQ5T4WrxGheKcO3HOn-XRPYifIywyukeleRyQ-Gyfw"
    },
    {
        name: "Touch Smart Switch",
        price: 22.50,
        originalPrice: 30.00,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAx2XceXC7Ei60rxo8r4ab-FG2Aa5tXCgDvfzBMv1gJFYUVYSwMB-X-zZne4nkqWoHfRRcg2-UpvxBkGMmW2s0yBlQQZUQGNOldf0xKveZF6oKptqCnQ-Ntgo18yTPcq9nFXRemJ3A6Fhq-ISG9xVxlxj06bLzpNZ1MMDIkZBi0Yv1LX-IOj1oQIMNd8m8YLJcY3sDUylbDuouki7J1xZf1TbuuRE78y4J0jw3fwaGo6McrQOLc3aTabyL1gc6Isdj-QDQt2nPyGQ",
        isSale: true
    },
    {
        name: "Outdoor Spot Cam",
        price: 89.99,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGtk2tt5aLZmPTfGKHOwtXyntYIuhva7GzKbe_Bf_g-qPjo1Y2Xco7yruFycdORtpYluPK86B1bkkn0b5VyYPDDsBukqFokjl1dwHApPT6GMG8TCfEVTjkBtPlXjCRM2CJgIY-aiN1k7-IKy6YglP68-3VSEimLmU3lrOXXu4a6ukw9GpL9SvS-_C-eSJwAYVrs1UufjmRxp4pC26CjG6ppF4JardqMGDEsGz4qFs7pIiSom6ZQzw47qitag-T7mCNjV0ZBwYU1vc"
    }
];

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("Description");

    const handleDecreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="w-full bg-background-light dark:bg-background-dark min-h-screen font-display flex flex-col items-center">
            <div className="flex-grow w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <div className="flex flex-wrap items-center gap-2 mb-8 text-sm text-slate-500 dark:text-[#95c6a9]">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <Link href="#" className="hover:text-primary transition-colors">Smart Home</Link>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <Link href="/shop" className="hover:text-primary transition-colors">Lighting</Link>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <span className="text-slate-900 dark:text-white font-medium">{product.name}</span>
                </div>

                {/* Product Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 mb-16">
                    {/* Left: Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-surface-dark group border border-slate-200 dark:border-transparent">
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                <span className="bg-primary text-surface-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Best Seller</span>
                                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">-15%</span>
                            </div>
                            <img // Using img tag for external URL simplicity in this context, or next/image if domain configured
                                alt={product.name}
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                src={product.images[activeImageIndex]}
                            />
                            {/* Image Nav Buttons (Overlay) */}
                            <button
                                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button
                                onClick={() => setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                        {/* Thumbnail Carousel */}
                        <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImageIndex === index ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600 opacity-70 hover:opacity-100'}`}
                                >
                                    <img
                                        alt={`Thumbnail ${index}`}
                                        className="w-full h-full object-cover"
                                        src={img}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col h-full">
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`material-symbols-outlined text-[18px] ${i < product.rating ? 'fill-current' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                ))}
                            </div>
                            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium hover:text-primary cursor-pointer transition-colors">({product.reviewCount} Reviews)</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-4">
                            {product.name} <span className="block text-2xl lg:text-3xl font-normal text-slate-500 dark:text-slate-400 mt-1">{product.subtitle}</span>
                        </h1>
                        <div className="flex items-end gap-4 mb-6">
                            <span className="text-4xl font-bold text-primary">${product.price}</span>
                            <span className="text-xl text-slate-400 dark:text-slate-500 line-through mb-1.5">${product.originalPrice}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-transparent mb-8">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Specs Grid (Quick View) */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-100 dark:bg-surface-highlight flex items-center justify-center text-slate-700 dark:text-primary">
                                    <span className="material-symbols-outlined">bolt</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-[#95c6a9]">Wattage</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">10W (60W Equiv)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-100 dark:bg-surface-highlight flex items-center justify-center text-slate-700 dark:text-primary">
                                    <span className="material-symbols-outlined">lightbulb</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-[#95c6a9]">Lumens</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">800 lm</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-100 dark:bg-surface-highlight flex items-center justify-center text-slate-700 dark:text-primary">
                                    <span className="material-symbols-outlined">wifi</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-[#95c6a9]">Connectivity</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Wi-Fi 2.4GHz</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-100 dark:bg-surface-highlight flex items-center justify-center text-slate-700 dark:text-primary">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-[#95c6a9]">Warranty</p>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">2 Years</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-px w-full bg-slate-200 dark:bg-surface-highlight mb-8"></div>

                        {/* Actions */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                    </span>
                                    In Stock (45 available)
                                </div>
                                <div className="flex items-center rounded-full bg-slate-100 dark:bg-surface-highlight p-1">
                                    <button
                                        onClick={handleDecreaseQuantity}
                                        className="size-10 rounded-full bg-white dark:bg-background-dark text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-surface-dark shadow-sm flex items-center justify-center transition-all"
                                    >
                                        <span className="material-symbols-outlined text-sm">remove</span>
                                    </button>
                                    <input
                                        className="w-12 bg-transparent text-center border-none p-0 text-slate-900 dark:text-white font-bold focus:ring-0"
                                        type="text"
                                        value={quantity}
                                        readOnly
                                    />
                                    <button
                                        onClick={handleIncreaseQuantity}
                                        className="size-10 rounded-full bg-white dark:bg-background-dark text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-surface-dark shadow-sm flex items-center justify-center transition-all"
                                    >
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 bg-primary hover:bg-[#2ec56a] text-surface-dark font-bold text-lg h-14 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(54,226,123,0.3)] hover:shadow-[0_0_30px_rgba(54,226,123,0.5)]">
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    Add to Cart
                                </button>
                                <button className="size-14 rounded-full border border-slate-300 dark:border-[#366348] text-slate-600 dark:text-[#95c6a9] hover:border-primary hover:text-primary dark:hover:text-primary dark:hover:border-primary flex items-center justify-center transition-all">
                                    <span className="material-symbols-outlined">favorite</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-[#5e7f6d] mt-2 justify-center lg:justify-start">
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">local_shipping</span> Free Shipping over $50</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">security</span> Secure Checkout</span>
                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">sync</span> 30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Info Tabs/Accordion */}
                <div className="w-full mb-16">
                    <div className="border-b border-slate-200 dark:border-surface-highlight mb-8 overflow-x-auto hide-scrollbar">
                        <div className="flex gap-8 min-w-max">
                            {["Description", "Specifications", "Reviews (128)", "Installation Guide"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 border-b-2 font-medium text-lg px-2 transition-colors ${activeTab === tab ? 'border-primary text-primary font-bold' : 'border-transparent text-slate-500 dark:text-[#95c6a9] hover:text-slate-800 dark:hover:text-white'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {activeTab === "Description" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-300">
                            <div className="lg:col-span-2 text-slate-600 dark:text-slate-300 space-y-6">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Smart lighting made simple.</h3>
                                <p className="leading-relaxed">
                                    Transform your home with the Lumina Smart LED Bulb. Whether you&apos;re setting the mood for a movie night, waking up gently with a sunrise simulation, or throwing a party with dynamic colors, this bulb does it all. No hub required—simply connect to your Wi-Fi and control via the Lumina app, Alexa, or Google Assistant.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-transparent">
                                        <div className="size-12 rounded-full bg-slate-200 dark:bg-surface-highlight flex items-center justify-center text-primary mb-4">
                                            <span className="material-symbols-outlined">palette</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">16 Million Colors</h4>
                                        <p className="text-sm">Choose from a vast spectrum of colors to create the perfect ambiance for any moment.</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-transparent">
                                        <div className="size-12 rounded-full bg-slate-200 dark:bg-surface-highlight flex items-center justify-center text-primary mb-4">
                                            <span className="material-symbols-outlined">schedule</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Schedules & Timers</h4>
                                        <p className="text-sm">Set your lights to turn on/off automatically based on your daily routine.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1">
                                <div className="bg-slate-50 dark:bg-surface-dark rounded-2xl p-6 border border-slate-100 dark:border-surface-highlight">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Technical Specs</h3>
                                    <div className="space-y-4">
                                        {product.specs.map((spec) => (
                                            <div key={spec.label} className="flex justify-between pb-4 border-b border-slate-200 dark:border-surface-highlight">
                                                <span className="text-slate-500 dark:text-[#95c6a9]">{spec.label}</span>
                                                <span className="font-medium text-slate-900 dark:text-white">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Placeholder for other tabs */}
                    {activeTab !== "Description" && (
                        <div className="min-h-[200px] flex items-center justify-center text-slate-500 animate-in fade-in duration-300">
                            Content for {activeTab} is being updated...
                        </div>
                    )}
                </div>

                {/* Reviews Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
                        <button className="text-primary font-bold hover:underline">Write a Review</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {product.reviews.map((review, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white dark:bg-background-dark border border-slate-200 dark:border-surface-highlight shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-slate-200 dark:bg-surface-highlight flex items-center justify-center font-bold text-slate-700 dark:text-white">
                                            {review.user.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.user}</h4>
                                            <p className="text-xs text-slate-500 dark:text-[#95c6a9]">Verified Buyer</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">{review.date}</span>
                                </div>
                                <div className="flex text-primary mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`material-symbols-outlined text-[18px] ${i < Math.floor(review.rating) ? 'fill-current' : 'text-slate-300 dark:text-surface-highlight'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    ))}
                                </div>
                                <h5 className="font-bold text-slate-900 dark:text-white mb-2">Great product!</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {review.content}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8 gap-2">
                        <button className="size-10 rounded-full bg-slate-100 dark:bg-surface-highlight text-slate-500 dark:text-[#95c6a9] hover:bg-primary hover:text-[#112117] flex items-center justify-center transition-colors">1</button>
                        <button className="size-10 rounded-full bg-transparent text-slate-500 dark:text-[#95c6a9] hover:bg-slate-100 dark:hover:bg-surface-highlight flex items-center justify-center transition-colors">2</button>
                        <button className="size-10 rounded-full bg-transparent text-slate-500 dark:text-[#95c6a9] hover:bg-slate-100 dark:hover:bg-surface-highlight flex items-center justify-center transition-colors">3</button>
                        <button className="size-10 rounded-full bg-transparent text-slate-500 dark:text-[#95c6a9] hover:bg-slate-100 dark:hover:bg-surface-highlight flex items-center justify-center transition-colors">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                        {relatedProducts.map((item, i) => (
                            <div key={i} className="group flex flex-col">
                                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-surface-dark mb-3">
                                    {item.isSale && <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Sale</span>}
                                    <img
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        src={item.imageUrl}
                                    />
                                    <button className="absolute bottom-3 right-3 size-10 rounded-full bg-white dark:bg-surface-highlight text-slate-900 dark:text-white shadow-lg flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-[#112117] transition-colors">
                                        <span className="material-symbols-outlined text-xl">shopping_bag</span>
                                    </button>
                                </div>
                                <h3 className="text-sm font-medium text-slate-900 dark:text-white truncate">{item.name}</h3>
                                <div className="flex gap-2 items-center">
                                    <p className={`text-sm font-bold ${item.isSale ? 'text-red-500' : 'text-slate-500 dark:text-[#95c6a9]'}`}>${item.price.toFixed(2)}</p>
                                    {item.originalPrice && <p className="text-xs text-slate-400 line-through">${item.originalPrice.toFixed(2)}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
