import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange?: (page: number) => void;
    className?: string;
}

export default function Pagination({
    currentPage = 1,
    totalPages = 10,
    totalItems = 100,
    itemsPerPage = 10,
    onPageChange,
    className = ''
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className={`flex items-center justify-between border-t border-white/5 bg-background-dark px-4 py-3 sm:px-6 ${className}`}>
            <div className="hidden sm:flex flex-1 items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">
                        Showing <span className="font-medium text-white">{startItem}</span> to <span className="font-medium text-white">{endItem}</span> of <span className="font-medium text-white">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Previous</span>
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button aria-current="page" className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-background-dark focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">1</button>
                        <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:z-20 focus:outline-offset-0">2</button>
                        <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/5 md:inline-flex focus:z-20 focus:outline-offset-0">3</button>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-white/10 focus:outline-offset-0">...</span>
                        <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/5 md:inline-flex focus:z-20 focus:outline-offset-0">8</button>
                        <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:z-20 focus:outline-offset-0">9</button>
                        <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </nav>
                </div>
            </div>
            {/* Mobile Pagination */}
            <div className="flex flex-1 justify-between sm:hidden">
                <button className="relative inline-flex items-center rounded-md border border-white/10 bg-background-dark px-4 py-2 text-sm font-medium text-white hover:bg-white/5">Previous</button>
                <button className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-background-dark px-4 py-2 text-sm font-medium text-white hover:bg-white/5">Next</button>
            </div>
        </div>
    );
}
