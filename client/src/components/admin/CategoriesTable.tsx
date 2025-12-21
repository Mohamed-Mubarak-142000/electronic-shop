'use client';

import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';

type Category = {
    id: string;
    image: string;
    name: string;
    slug: string;
    isSubCategory?: boolean;
    productsCount: number;
    status: 'Active' | 'Hidden';
};

const categories: Category[] = [
    {
        id: '1',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1b1FaRNQ7vO73wX4jNN9wKIA28ULfceVx6TQ0RYOhl0CC0uonXz2HD-GsGrOI3QCpCxRwQ94A7NDz54oYtOsRiCBI_hHXxHUimWAfpKQnhApKdiuqC_DnKKH6OviMRszFlBJUdXwgN0zT0CaHBTR4hMpmDW-g49qf0eOgTHo_mVcw3OkaCT_FsbHtakQxN0ncGjCX2lRXKEJLhtBYkcJ8Pjc9cStHug8bUrjQxrdBi3y5lkGPJWaWkPwpz-XPGdAbqsnJ-djpobo',
        name: 'Industrial Cabling',
        slug: '/industrial-cabling',
        productsCount: 1240,
        status: 'Active'
    },
    {
        id: '2',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8ClPrbg3qZ74qTYDlQkPkuJ72H8JScq9KJh11m55gTfO4wH8QvyCc6DCvTsP_RnIib9rRfv_fPXH0_OnFjnrStqiJa1uU0d8AUdpvRS5CDCUXvUCJQRBGWcY_j_sZNWtoQI0goHbZr_UjJamSBgUx5C9SpEIY_meOUzIVZ4FoBET45RoedJKahAH3LPZdQ3pa3CgdmfDrUsynxsMFhw0yCgbZXrD5yLJhkGoLx2a2yLL1drI_qbfH_fRD0tiwTHhG2MY5MzxfkPc',
        name: 'Copper Wire',
        slug: '/industrial-cabling/copper',
        isSubCategory: true,
        productsCount: 450,
        status: 'Active'
    },
    {
        id: '3',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj3749FRAsgbL2f8jACHHBT8bsUsp_3MFnJR3VL9cSNlUJPbuHg-Tn85UCsF0W-K4YeKbU3ajzO1nQyebtkjHljLdY3m170hJZbNzjKF-P57-Xgeqm8WehHGZY-fO3hcW6wD1vhX3EnqnC5kawMGifQZOIYBomKLm3En3I7womc0Vna2R-8rHaSubG0hHHrXPioGf-VAU90JxH0HQPT62slbFws7JSKK1n1_OBl5zVknw7XythJxQ7zLu3ld--JLHYAGscFFRcr2I',
        name: 'LED Lighting',
        slug: '/led-lighting',
        productsCount: 850,
        status: 'Active'
    },
    {
        id: '4',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzaUGFCiPsw6dtBiUEiqijq6q19SC1DD9D4I3Hbcn5zy5nAWf4TCGElSCE1kXbhTNBhO5C1FZIrsIimtKBBxWoCrXHQabL00GYpoKpT5PCgtWDaVDn_DX5sI6baCqnJIKLLaXOhf5h-m1Nq5lmy-be3bXKFM6HkEEcSTIVUQouY0iYXzuErW43jdEojK8fAsluSPVTViDvfZJI-ipUAldmQSUONjtb9ospDbebPgzXYkw-MGHP1_qlJigU0CA3xAq1K0K2gihwrvs',
        name: 'Circuit Breakers',
        slug: '/circuit-breakers',
        productsCount: 320,
        status: 'Hidden'
    }
];

export default function CategoriesTable() {
    const columns: Column<Category>[] = [
        {
            header: (
                <div className="w-12 pl-6">
                    <input className="rounded border-[#254632] bg-[#254632] text-primary focus:ring-0 focus:ring-offset-0 size-4" type="checkbox" />
                </div>
            ),
            cell: () => (
                <div className="pl-6">
                    <input className="rounded border-[#254632] bg-[#254632] text-primary focus:ring-0 focus:ring-offset-0 size-4" type="checkbox" />
                </div>
            ),
            className: "w-12 pl-6"
        },
        {
            header: <span className="text-gray-400">Category</span>,
            cell: (row) => (
                <div className={`flex items-center gap-4 ${row.isSubCategory ? 'pl-6 relative' : ''}`}>
                    {row.isSubCategory && (
                        <>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-gray-400/30"></div>
                            <div className="absolute left-0 top-[-25px] bottom-1/2 w-px bg-gray-400/30"></div>
                        </>
                    )}
                    <img className="size-12 rounded-full object-cover border-2 border-[#254632] group-hover:border-primary transition-colors" src={row.image} alt={row.name} />
                    <div>
                        <p className="text-white font-medium">{row.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5 md:hidden">{row.slug}</p>
                        {row.isSubCategory && <p className="text-xs text-gray-400">Sub-category</p>}
                    </div>
                </div>
            )
        },
        {
            header: <span className="hidden md:table-cell text-gray-400">Slug</span>,
            cell: (row) => <span className="text-custom-gray text-gray-400">{row.slug}</span>,
            className: "hidden md:table-cell font-mono"
        },
        {
            header: <span className="text-gray-400">Products</span>,
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{row.productsCount.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">items</span>
                </div>
            )
        },
        {
            header: <span className="text-gray-400">Status</span>,
            cell: (row) => {
                const statusStyles = row.status === 'Active'
                    ? 'bg-primary/20 text-primary border-primary/20'
                    : 'bg-[#254632] text-gray-400 border-gray-400/20';
                const dotColor = row.status === 'Active' ? 'bg-primary' : 'bg-gray-400';

                return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusStyles}`}>
                        <span className={`size-1.5 rounded-full ${dotColor}`}></span>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: <span className="text-gray-400">Actions</span>,
            className: "text-right pr-6",
            cell: () => (
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="size-8 flex items-center justify-center rounded-full bg-[#254632] text-white hover:bg-primary hover:text-background-dark transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="size-8 flex items-center justify-center rounded-full bg-[#254632] text-white hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col">
            <DataTable
                data={categories}
                columns={columns}
                className="rounded-3xl shadow-xl bg-surface-dark border-[#254632]"
            />
            <Pagination
                currentPage={1}
                totalPages={8}
                totalItems={45}
                itemsPerPage={5}
                className="rounded-3xl shadow-xl mt-4"
            />
        </div>
    );
}
