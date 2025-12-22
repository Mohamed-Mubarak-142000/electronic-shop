'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductCard from "@/components/shared/ProductCard";
import { productService } from "@/services/productService";
import { categoryService, brandService } from "@/services/metadataService";

export default function ShopPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || '-createdAt');

    const fetchMetadata = async () => {
        try {
            const [cats, brs] = await Promise.all([
                categoryService.getCategories(),
                brandService.getBrands()
            ]);
            setCategories(cats);
            setBrands(brs);
        } catch (error) {
            console.error("Error fetching metadata:", error);
        }
    };

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params: any = {
                page,
                limit: 9,
                sort: sortBy
            };
            if (selectedCategory) params.category = selectedCategory;
            if (selectedBrand) params.brand = selectedBrand;
            if (minPrice) params.minPrice = minPrice;
            if (maxPrice) params.maxPrice = maxPrice;

            const data = await productService.getProducts(params);
            setProducts(data.products);
            setPages(data.pages);
            setTotal(data.total);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [page, selectedCategory, selectedBrand, minPrice, maxPrice, sortBy]);

    useEffect(() => {
        fetchMetadata();
    }, []);

    useEffect(() => {
        fetchProducts();

        // Update URL
        const params = new URLSearchParams(searchParams.toString());
        if (page > 1) params.set('page', page.toString()); else params.delete('page');
        if (selectedCategory) params.set('category', selectedCategory); else params.delete('category');
        if (selectedBrand) params.set('brand', selectedBrand); else params.delete('brand');
        if (minPrice) params.set('minPrice', minPrice); else params.delete('minPrice');
        if (maxPrice) params.set('maxPrice', maxPrice); else params.delete('maxPrice');
        if (sortBy !== '-createdAt') params.set('sort', sortBy); else params.delete('sort');

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [fetchProducts, page, selectedCategory, selectedBrand, minPrice, maxPrice, sortBy, pathname, router]);

    const handleCategoryToggle = (id: string) => {
        setSelectedCategory(prev => prev === id ? '' : id);
        setPage(1);
    };

    const handleBrandToggle = (id: string) => {
        setSelectedBrand(prev => prev === id ? '' : id);
        setPage(1);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrand('');
        setMinPrice('');
        setMaxPrice('');
        setPage(1);
    };

    return (
        <div className="flex-1 flex flex-col items-center py-8 px-4 md:px-10 lg:px-20 bg-background-dark font-display min-h-screen">
            <div className="w-full max-w-[1440px] flex flex-col gap-8">
                {/* Page Heading & Breadcrumbs */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-highlight pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-[#95c6a9] mb-1">
                            <Link href="/" className="hover:text-primary transition-colors">
                                Home
                            </Link>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="text-white">All Products</span>
                        </div>
                        <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                            All Products
                        </h1>
                        <p className="text-[#95c6a9] text-base max-w-2xl mt-2">
                            Browse our wide selection of professional-grade electrical components, smart home devices, and tools for every project.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-5 h-12 rounded-full bg-surface-highlight text-white font-bold text-sm hover:bg-[#2f553d] transition-colors whitespace-nowrap w-fit">
                        <span className="material-symbols-outlined">download</span>
                        Download Catalog
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6 p-6 rounded-2xl bg-surface-dark border border-surface-highlight">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-bold text-lg">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="text-[#95c6a9] text-sm hover:text-primary transition-colors"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider opacity-80">Category</h4>
                            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                {categories.map((cat) => (
                                    <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategory === cat._id}
                                            onChange={() => handleCategoryToggle(cat._id)}
                                            className="rounded border-2 border-surface-highlight bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-5"
                                        />
                                        <span className={`transition-colors ${selectedCategory === cat._id ? "text-white font-medium" : "text-[#95c6a9] group-hover:text-white"}`}>
                                            {cat.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="h-px bg-surface-highlight w-full"></div>

                        {/* Price Filter */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider opacity-80">Price Range</h4>
                            <div className="flex gap-2 mt-1">
                                <div className="flex-1 bg-surface-highlight rounded-lg px-3 py-2">
                                    <span className="text-xs text-[#95c6a9] block">Min</span>
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-white text-sm focus:ring-0 font-bold"
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                                        placeholder="0"
                                    />
                                </div>
                                <div className="flex-1 bg-surface-highlight rounded-lg px-3 py-2">
                                    <span className="text-xs text-[#95c6a9] block">Max</span>
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-white text-sm focus:ring-0 font-bold"
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                                        placeholder="Any"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-surface-highlight w-full"></div>

                        {/* Brand Filter */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider opacity-80">Brand</h4>
                            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                {brands.map((brand) => (
                                    <label key={brand._id} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrand === brand._id}
                                            onChange={() => handleBrandToggle(brand._id)}
                                            className="rounded border-2 border-surface-highlight bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-5"
                                        />
                                        <span className={`transition-colors ${selectedBrand === brand._id ? "text-white font-medium" : "text-[#95c6a9] group-hover:text-white"}`}>
                                            {brand.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1 w-full">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-surface-dark p-4 rounded-2xl border border-surface-highlight">
                            <p className="text-[#95c6a9] text-sm font-medium">
                                <span className="text-white font-bold">{total}</span> results found
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                                        className="appearance-none bg-surface-highlight text-white text-sm font-medium h-10 pl-4 pr-10 rounded-full border-none focus:ring-1 focus:ring-primary cursor-pointer outline-none"
                                    >
                                        <option value="-createdAt">Newest Arrivals</option>
                                        <option value="price">Price: Low to High</option>
                                        <option value="-price">Price: High to Low</option>
                                        <option value="-rating">Top Rated</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#95c6a9] pointer-events-none text-lg">
                                        expand_more
                                    </span>
                                </div>
                                <div className="flex bg-surface-highlight rounded-full p-1 gap-1">
                                    <button className="size-8 flex items-center justify-center rounded-full bg-primary text-surface-dark">
                                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                                    </button>
                                    <button className="size-8 flex items-center justify-center rounded-full text-[#95c6a9] hover:text-white hover:bg-[#2f553d] transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">view_list</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-surface-dark rounded-[2rem] p-4 h-96 animate-pulse border border-surface-highlight"></div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <span className="material-symbols-outlined text-6xl text-[#95c6a9] mb-4 opacity-20">inventory_2</span>
                                <h3 className="text-white text-xl font-bold mb-2">No products found</h3>
                                <p className="text-[#95c6a9]">Try adjusting your filters or search criteria.</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-6 px-6 py-2 bg-primary text-background-dark font-bold rounded-full hover:bg-green-400 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {pages > 1 && (
                            <div className="mt-12 flex justify-center">
                                <nav className="flex items-center gap-2 bg-surface-dark p-2 rounded-full border border-surface-highlight">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                        className="size-10 flex items-center justify-center rounded-full text-[#95c6a9] hover:bg-surface-highlight hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </button>

                                    {[...Array(pages)].map((_, i) => {
                                        const pageNum = i + 1;
                                        // Simple pagination logic, showing all for now as pages might be low
                                        // Can be optimized for many pages later
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`size-10 flex items-center justify-center rounded-full transition-colors font-bold ${page === pageNum ? 'bg-primary text-[#122118] shadow-lg shadow-primary/20' : 'text-white hover:bg-surface-highlight hover:text-white'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        disabled={page === pages}
                                        onClick={() => setPage(prev => Math.min(pages, prev + 1))}
                                        className="size-10 flex items-center justify-center rounded-full text-[#95c6a9] hover:bg-surface-highlight hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
