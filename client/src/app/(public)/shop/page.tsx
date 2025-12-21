import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";

// Mock Data based on design HTML
const products = [
    {
        _id: "1",
        name: "Smart Wi-Fi LED Bulb, Color Ambiance",
        description: "Philips Hue", // Using description for Brand as per card layout
        price: 49.99,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx6nL-zSFEhHia4iFBfbNyEPDlVOCbbh9Pmhde4zQTZZn-c1NUNOampn2PI_42B2Gxa7embHYmFgbcfl5vKUKcroFtE6uGVbgz--jFhNaH5QiAE4CpoYXcqZLBMG3qcxPbb39C5ir-milycZ5tDhakuL3U6nvKUhlrwPKNHbKeMjSLgsVCEnTwtb_Tc-eePMHsTWjyJEeKN9tvzIuy-2adyojYb5J3IKkSMddAV_iok7U6qVn3OGG8ZZBGuSdzMP1l1ZksPJGYpqw",
        rating: 4.5,
        reviewCount: 128,
        discount: 0,
        isNew: true,
    },
    {
        _id: "2",
        name: "20 Amp Single-Pole Circuit Breaker",
        description: "Siemens",
        price: 8.49,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzy8r9Xw_SvE2ysGDpW_xvSV6IQDDs7sxMaoWXFVd3c8q6Z9QjBWYjCKnt7R3BqaLclVcVZSnyoAFJLm1iM_2NMc7msvfhdX3SU8h-ECLdSduCH-huxi9DFiV19BO2kdeS5lc_BV_dVrDf7XuI7Nc4hSVe5JVnaDtr-3VdWquSZlSlXwqv4K5IJ7bhYdJZ0ueQbkzQAs6yKrGzDYjgJXozeWFxDCaKV4cwPllEkzZqgeQjc0fq8tJBRKxGPW4RLuDPs8C5A3AVxqk",
        rating: 4.8,
        reviewCount: 42,
        discount: 15,
    },
    {
        _id: "3",
        name: "T9 Smart Thermostat with Sensor",
        description: "Honeywell",
        price: 169.00,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATO-_-nuvqnEHalsJF4uZvPIjJrGYckTBK9QG_YDHbu_jYu276vNGL5XSUGPyTBrLREGJiHYcUQqBpOsdlkiRsqCL6Vww6XUS_VAAC3QPnCWqJfJhnlUKNNNeCvtaFVMsa7u90dDoaJe1mpapT_QlzIk3DyeTIhCEA26XyYqvFKSh1RlccttX5DWR-DLxWJUVLrS9bG7pKsH_QL0C-FbSMb-z-o0nFIMfUoQUdOtgILJC89Xc49t35yxK8QhKfCV5mrDBfmP62CFY",
        rating: 5,
        reviewCount: 856,
        discount: 0,
        lowStock: true,
    },
    {
        _id: "4",
        name: "Heavy Duty Wire Stripper & Cutter",
        description: "Klein Tools",
        price: 24.97,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBLODAGyWVHs_0nfVjzrNUkIVWQAsS1sI9BCeNDNHnY5iyjf_5mgKrCjhdkbefm9xfmpelrA3JsogIlZV58aKXUoElu-j_PwySEn-cemOEc-DenJDIiYIwta466U_m43b1wO7Ho2w00jGej2Z3VA9BdzPxSZ4kdhGegCs6eNY2TOspUuKg2d_6hi9fyqfwRder_Nkjc_GTi5zg1rak4BJkimyNeJjxacyv-9NV6gmJ37defXVissSoUFNvi1J-kvLeWsW3uSth9pM",
        rating: 4.5,
        reviewCount: 210,
        discount: 0,
    },
    {
        _id: "5",
        name: "Kasa Smart Plug Ultra Mini (4-Pack)",
        description: "TP-Link",
        price: 29.99,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdgdW6X4BH4gfBizC9-YUsw9IZQhMdS1zhxOsvODQXh_nTKif7akSNumQPonfARNKyt3-04VE0eyq4vqMgtrhq_sbwjWn_JA6BiAVCQ5-DoQtHwEtPD91v1UqEKO8-nGpNpVnsp-mirRkc1pEf725Gyu-TozaDAKHLFulC4GUa_17lVQN8EdM97ndAyZCtje0Fi5rikexAY3mqQiLn2bKVi79bBcnJoVDn0UOeodhZMzBREpGphxUNVUcxX-foLssG5ApTii9yAeo",
        rating: 5,
        reviewCount: 3450,
        discount: 0,
        bundle: true,
    },
    {
        _id: "6",
        name: "Dempsey Low Profile Ceiling Fan with Light",
        description: "Hunter Fan",
        price: 149.99,
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIUyH1VFXwtoVtNiLwOA8bqGkUYqAljSJWsyMuWXT49BeiMZ9wwn24oSGsd8ZTyBIc1dk78TS_3zr6S2ujWXl_soxal1yUteCBQcyJ6Dek0a6b8veItRl5Tm88jGRM_k_DU4nYOnedaVQrMB11bwmTAGAl0OTqPSVUSMhdtfQWUzHUfih1uIGg_KOOwqoZP3dNTvdLTFui6zDGOa14nYo_phnPd-2nFlW-lmIXJYXa86n25S4FZ3K0XzIJiiQ7pe3rwztjN4qxE-I",
        rating: 4.5,
        reviewCount: 94,
        discount: 0,
    },
];

export default function ShopPage() {
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
                            <button className="text-[#95c6a9] text-sm hover:text-primary">Clear All</button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider opacity-80">Category</h4>
                            <div className="flex flex-col gap-2">
                                {["Lighting", "Wiring Devices", "Smart Home", "Circuit Breakers", "Tools & Gear"].map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            defaultChecked={cat === "Smart Home"}
                                            className="rounded border-2 border-surface-highlight bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-5"
                                        />
                                        <span className={`transition-colors ${cat === "Smart Home" ? "text-white font-medium" : "text-[#95c6a9] group-hover:text-white"}`}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="h-px bg-surface-highlight w-full"></div>

                        {/* Price Filter */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider opacity-80">Price Range</h4>
                            <div className="flex items-center justify-between text-sm text-white font-bold">
                                <span>$10</span>
                                <span>$500+</span>
                            </div>
                            <div className="relative h-1.5 w-full bg-surface-highlight rounded-full">
                                <div className="absolute left-0 top-0 h-full w-1/2 bg-primary rounded-full"></div>
                                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 bg-white rounded-full cursor-pointer shadow-lg shadow-black/50"></div>
                            </div>
                            <div className="flex gap-2 mt-1">
                                <div className="flex-1 bg-surface-highlight rounded-lg px-3 py-2">
                                    <span className="text-xs text-[#95c6a9] block">Min</span>
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-white text-sm focus:ring-0 font-bold"
                                        type="number"
                                        defaultValue={10}
                                    />
                                </div>
                                <div className="flex-1 bg-surface-highlight rounded-lg px-3 py-2">
                                    <span className="text-xs text-[#95c6a9] block">Max</span>
                                    <input
                                        className="w-full bg-transparent border-none p-0 text-white text-sm focus:ring-0 font-bold"
                                        type="number"
                                        defaultValue={250}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-surface-highlight w-full"></div>

                        {/* Brand Filter */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-semibold text-sm uppercase tracking-wider opacity-80">Brand</h4>
                            <div className="flex flex-col gap-2">
                                {["Philips Hue", "Lutron", "Siemens", "Klein Tools"].map((brand) => (
                                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="rounded border-2 border-surface-highlight bg-transparent text-primary focus:ring-0 focus:ring-offset-0 size-5"
                                        />
                                        <span className="text-[#95c6a9] group-hover:text-white transition-colors">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="h-px bg-surface-highlight w-full"></div>

                        {/* Availability */}
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">In Stock Only</span>
                            <button className="relative w-11 h-6 bg-surface-highlight peer-checked:bg-primary rounded-full transition-colors">
                                <div className="absolute top-1 left-1 bg-white size-4 rounded-full transition-transform translate-x-5"></div>
                            </button>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1 w-full">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-surface-dark p-4 rounded-2xl border border-surface-highlight">
                            <p className="text-[#95c6a9] text-sm font-medium">
                                <span className="text-white font-bold">124</span> results found
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <select className="appearance-none bg-surface-highlight text-white text-sm font-medium h-10 pl-4 pr-10 rounded-full border-none focus:ring-1 focus:ring-primary cursor-pointer">
                                        <option>Newest Arrivals</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Best Selling</option>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center gap-2 bg-surface-dark p-2 rounded-full border border-surface-highlight">
                                <button className="size-10 flex items-center justify-center rounded-full text-[#95c6a9] hover:bg-surface-highlight hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="size-10 flex items-center justify-center rounded-full bg-primary text-[#122118] font-bold shadow-lg shadow-primary/20">
                                    1
                                </button>
                                <button className="size-10 flex items-center justify-center rounded-full text-white hover:bg-surface-highlight transition-colors font-medium">
                                    2
                                </button>
                                <button className="size-10 flex items-center justify-center rounded-full text-white hover:bg-surface-highlight transition-colors font-medium">
                                    3
                                </button>
                                <span className="text-[#95c6a9] px-2">...</span>
                                <button className="size-10 flex items-center justify-center rounded-full text-white hover:bg-surface-highlight transition-colors font-medium">
                                    12
                                </button>
                                <button className="size-10 flex items-center justify-center rounded-full text-[#95c6a9] hover:bg-surface-highlight hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
