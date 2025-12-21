'use client';

import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';

type Brand = {
    id: string;
    image: string;
    name: string;
    url: string;
    productsCount: number;
    status: 'Active' | 'Review' | 'Inactive';
    lastUpdated: string;
};

const brands: Brand[] = [
    {
        id: '1',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNg1Ay9qmBEgOE2b7coXfUrxwhTS9_6htXFgl-jJhxtXk3dPCHBPPafbwpPZ94CKu2Gyi8G4SbkHQ7YBOqLHRAoWQFrDRWS_hMQPFSQ65OppOJSwBuG0uMOmuXoU6cOIVkpPD7GnzOuCQ3Fn4gUt6d9Bx4vQ2u4W1YFaozhsTIDR4oPqMOQl6_9G5fgUL5u_-Dg6QI8h1KHp5e2-wqSSsG4qcEh4mBD9_qWKG-tUFRd7BxISLf5AcCMjJ84Ms87OXQUIwGzrkYuRY',
        name: 'Samsung Electronics',
        url: 'samsung.com',
        productsCount: 142,
        status: 'Active',
        lastUpdated: 'Oct 24, 2023'
    },
    {
        id: '2',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCprkH9kwuwhrTuw2i_P8mAbGPTQbhjmCbIhzGFXbvbPYvhd14JRkNzs9d5JxHDrZ0dAr1AIIFqJZS_vSxUjpPafny6GFvmrV7B6IPa65q-zkKlFoBEPFapFtFS0qVW8I0Dy5hghplatfK6LKiLliBPiipuemvx_FgbhBQIdkCSFIH0sOKILlNB4sRaYPpXwdQDcHhUWzpSH7mtaTj07b1DblQIhy17pHiWgmsFNfSs3p2ryXBMeJh28oQNReDa-gCfI8NUbkuE0nM',
        name: 'Philips Lighting',
        url: 'philips.com',
        productsCount: 89,
        status: 'Active',
        lastUpdated: 'Oct 22, 2023'
    },
    {
        id: '3',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBasLvI6bsJ_yYHgS0513XW5CF4m86WIfT358QoI24Othud4kbeU_KtNdLtKX1jHTu4vNO7CKof_Uqz8DhlFu6zccdls7aIxFixXxh_T2uJo4PWuRrK1hyAyvGspE_uKv7-tcfUYmm0Y1DcEwZZEFuNJ_OoTIcjR7d_q-lI5A85Zb5fQEX0Gc7MFLhuAqHYkGGtFOZ7Mqo17mbSxa6tYhB79jho8QgooHWqn819KfwNjP-IbXV4ARNfwwBRpF3wIMNaRvbzkrFpL-E',
        name: 'Schneider Electric',
        url: 'se.com',
        productsCount: 204,
        status: 'Review',
        lastUpdated: 'Oct 20, 2023'
    },
    {
        id: '4',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_lGjA7AMhV3hBVgv3ij7bHtRHWlwHS9zkNVNfb_laXoh1UJAN5PRGwRlrWaofvg58YBCTR_O8cSTV64LKoQuQD2HMpoxPVGGaR9_WLtLyG7AREBYeyjjOPTYLZNvm-XjJekujD2iDn5vntTwPD-HXAOBd5qMEAqMjFeriGA3EYuNfbODxCFWc-ESFSnxgPPjetD63Ud03BuPjsg2X0XpCLIt6SpTJlSbJj1mZmZopxcECsRjE8pt3Uh8SN1bVYdHkzkeqW_lukEo',
        name: 'Siemens',
        url: 'siemens.com',
        productsCount: 156,
        status: 'Inactive',
        lastUpdated: 'Sep 14, 2023'
    }
];

export default function BrandsTable() {
    const columns: Column<Brand>[] = [
        {
            header: <span className="pl-8">Brand Details</span>,
            cell: (row) => (
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <img className="w-full h-auto object-contain" src={row.image} alt={row.name} />
                    </div>
                    <div>
                        <p className="text-white font-medium">{row.name}</p>
                        <a className="text-gray-400 text-xs hover:text-primary hover:underline transition-colors" href="#">{row.url}</a>
                    </div>
                </div>
            ),
            className: "pl-8"
        },
        {
            header: 'Products',
            cell: (row) => (
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-background-dark text-white border border-white/5">
                    {row.productsCount}
                </div>
            )
        },
        {
            header: 'Status',
            cell: (row) => {
                let statusStyles = '';
                let dotColor = '';
                if (row.status === 'Active') {
                    statusStyles = 'bg-primary/20 text-primary border-primary/20';
                    dotColor = 'bg-primary';
                } else if (row.status === 'Review') {
                    statusStyles = 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20';
                    dotColor = 'bg-yellow-500';
                } else {
                    statusStyles = 'bg-gray-600/20 text-gray-400 border-gray-600/20';
                    dotColor = 'bg-gray-500';
                }

                return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`}></span>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: 'Last Updated',
            accessorKey: 'lastUpdated',
            className: 'text-gray-400 text-sm'
        },
        {
            header: 'Actions',
            className: 'text-right pr-8',
            cell: () => (
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full hover:bg-background-dark text-gray-400 hover:text-white transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button className="p-2 rounded-full hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col">
            <DataTable
                data={brands}
                columns={columns}
                className="bg-surface-dark border-white/5 border-0"
            />
            <Pagination
                currentPage={1}
                totalPages={3}
                totalItems={128}
                itemsPerPage={4}
            />
        </div>
    );
}
