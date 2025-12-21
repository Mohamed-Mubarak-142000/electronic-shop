'use client';

import { DataTable, Column } from '@/components/ui/data-table';
import Pagination from './ui/Pagination';

// Define the Product type
type Product = {
    id: string;
    image: string;
    name: string;
    sku: string;
    category: string;
    brand: string;
    price: string;
    stock: number;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
};

// Define the data
const products: Product[] = [
    {
        id: '1',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIi-iIpAGLN7j6jvJl8ahB7SyfPoJl5R71Yx4AxGz1BLcJFaMK5qZXcVOfyUUnIb8z6jryXXaxmLXLoxPPWnkCGUL6b92pbhMBMme4O9zERVsGZkYA51dU1K4fshjQX5IwHDmycy65SJl7rUPfwuQwkp5fqP4yqURT4Pv00-yOGkU1uElNh5isl7EdVjL8QviKUplc-TAIuD8ZTgjLnoRjv-dkyqndrw6bG21OF8TJtn4sNuKQfjNaSOfT-3defQJ0HsnmZld88mQ',
        name: 'Industrial Circuit Breaker 10A',
        sku: 'SKU: CB-10A-IND',
        category: 'Protection',
        brand: 'Schneider',
        price: '$45.00',
        stock: 124,
        status: 'In Stock'
    },
    {
        id: '2',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8-RgQ0cFeKvxjETKLACCxiBze_5WfHI9vhmo9j06kin-FZXntEacvc9t96ZyVPEI6dxymQWLa6GLVJJE6-dB0cY_ZgYBQMrWQFnVPdsdD8nHYoKqGxv59K3QOb0LzpL7odOhwuDiklht2MYlQdm8zMndSDZGtcb0oy5t1eGwp7FYNnrrYTiEYq4VYnQH3srJWGNGRyBwaEvMvF6xfJciIIRjIQ0srpe_TScx4ldWqoO9e10FSGUG7KOWQPRvhiAb3r-MWNhPZVwQ',
        name: 'Copper Wire Spool 50m',
        sku: 'SKU: CW-50M-002',
        category: 'Wiring',
        brand: 'Generic',
        price: '$120.50',
        stock: 15,
        status: 'Low Stock'
    },
    {
        id: '3',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlmb1XCzG3znbFKJhkN6R9uciYo38Zn19TIUud6XYiTbO28hHEEuLsOyC7Kei6smA9X7Zq-oSD8cTKOpWGgvoWnLeCaE6boDNHqFEsqx7eTbTPJHsqZG7GIDae60DqWqlp_2nE_bg92CqeGpnLN6W79ka45FVPKqYfBExvjCGL1dnN-VZY0ilxWw9qNNe4mS4BD9YhBvl9qLSpcw4PB2kg0b-17AEDd83Nxrl8pV9go4lzlA2IBEQu7s1xMEZeJiOjmUTpp2l1NK4',
        name: 'Heavy Duty Fuse 200A',
        sku: 'SKU: HDF-200A',
        category: 'Protection',
        brand: 'Siemens',
        price: '$89.99',
        stock: 0,
        status: 'Out of Stock'
    },
    {
        id: '4',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8FpNMh8E2ujPhv3dEz6wKAVgH2m4go82qxVpMFJcsWYaRA3_9VXtpqsGTQXNCmPJpPTxJlKemQX3y8DIY2Lx6YElahJ4lcdEhpWpaLPtE361LuO0WnpdC1dEwdvuoFAwxKMBxhgRdrdRjE8CRbkd13fu1otIaRDBKGHOj4wdMUauAO7dWI5D6oeGLNKIM-22pilm128RjhShMCTVYWelYe3q_LWhRMOc9k2aq-wvYvFWTZIo0aVvkGQYZP2_0hpvhZ2-rF5uTOc0',
        name: 'Smart LED Bulb E27',
        sku: 'SKU: LED-SMART-RGB',
        category: 'Lighting',
        brand: 'Philips',
        price: '$24.95',
        stock: 342,
        status: 'In Stock'
    },
    {
        id: '5',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBABgq3_Zw8iFTx1mGilqqGtwJxbBFoVhWBPYKbtrUcjj_ZPGGeQMt1VPe_DE_00DwVTllDp2PHKud_5OYKCBp7SDQUE_G8a6d5LtpKapYKYB6XavMJgwAX8TVZsJSGe3TIN54dsOr8K6baF5oHM2G2fRSGQg8cvfsM53GaT4695OUIgY82SC8haZP_2gQLzzceHNdefZUoqK5ZLGP0l0hG6Ck92s8vDa_fBMy36LgHBlhTXyczYdf6lkdWXsyDPpwh0lyM5YVXSN0',
        name: 'Cordless Drill Driver 18V',
        sku: 'SKU: TOOL-DR-18V',
        category: 'Tools',
        brand: 'DeWalt',
        price: '$149.00',
        stock: 45,
        status: 'In Stock'
    }
];

export default function ProductsTable() {
    const columns: Column<Product>[] = [
        {
            header: 'Product',
            cell: (row) => (
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-white/5 flex-shrink-0 overflow-hidden border border-white/10">
                        <img
                            alt={row.name}
                            className="h-full w-full object-cover"
                            src={row.image}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-medium">{row.name}</span>
                        <span className="text-gray-400 text-xs">{row.sku}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Category',
            accessorKey: 'category',
            className: 'text-gray-300'
        },
        {
            header: 'Brand',
            accessorKey: 'brand',
            className: 'text-gray-300'
        },
        {
            header: 'Price',
            accessorKey: 'price',
            className: 'text-white font-medium text-right'
        },
        {
            header: 'Stock',
            accessorKey: 'stock',
            className: 'text-gray-300 text-right'
        },
        {
            header: 'Status',
            className: 'text-center',
            cell: (row) => {
                let statusColor = '';
                if (row.status === 'In Stock') {
                    statusColor = 'bg-primary/10 text-primary border-primary/20';
                } else if (row.status === 'Low Stock') {
                    statusColor = 'bg-orange-400/10 text-orange-400 border-orange-400/20';
                } else {
                    statusColor = 'bg-slate-700 text-gray-300 border-slate-600';
                }

                return (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${statusColor}`}>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: () => (
                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col">
            <DataTable
                data={products}
                columns={columns}
                className="bg-surface-dark border-white/5"
            />
            <Pagination
                currentPage={1}
                totalPages={8}
                totalItems={1240}
                itemsPerPage={5}
            />
        </div>
    );
}
