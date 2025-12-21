'use client';

import { DataTable, Column } from '@/components/ui/data-table';
import { cn } from '@/lib/utils';

type Order = {
    id: string;
    customer: {
        name: string;
        email: string;
        avatar?: string;
        initials?: string;
    };
    date: string;
    total: string;
    status: 'Processing' | 'Shipped' | 'Delivered';
    active?: boolean;
};

const orders: Order[] = [
    {
        id: '#ORD-7729',
        customer: {
            name: 'John Electrician',
            email: 'john.e@spark.com',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv8xRQsmywzC3SLA5gYbYw_JX11P8PbZvn4ZZr_-lQ3uCNttUCW0oDK7bpr5eCd-DVx6LrWGxqT6NiPBWvQAiWIMcFtOu9h-bOsG8iDk7BMTx7mD5YzwfbZhC5_fmugqaMo6bVgrYxjISErjF36jIbnP5cOYXtfy2A3b1ADbmc1RrWWnr5XOiaHhG5eRf7zd8m_d_i7w-2tgFZns_swOCO4YW9f5MP6dkfP8gMhUzgxCg8bdVIfKyXnA9IucdfHrDgX61UX7e_MNQ'
        },
        date: 'Oct 24, 2023',
        total: '$1,240.50',
        status: 'Processing',
        active: true
    },
    {
        id: '#ORD-7728',
        customer: {
            name: 'Sarah Miller',
            email: 'sarah.m@design.co',
            initials: 'SM'
        },
        date: 'Oct 24, 2023',
        total: '$450.00',
        status: 'Shipped'
    },
    {
        id: '#ORD-7727',
        customer: {
            name: 'Michael Chen',
            email: 'm.chen@build.io',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpP5hrSXZfpr8YX5qfd3b9AC4cb1dP0OfqIat7QIUBn-hwd31nX3ZWLrd-7Zezk2ogabb9mXV9DM3Thc2Ba9kvmHAaP6Fqjfa9K5Aa5siQpe4j068md0dR7YA2LJwGNuZMJyEkLYdVjEiDq3yMXHuZYZ5uN3GdM16XlcBTItE8k_VQwdLYAAGDbfFu6Lp6Bapb5ZhX8-fNUP6POGiG_6_nwMWhhXZZsZdmoQIqBvCbJ8h0qqhYMMX_O9xTvSr-vIXqedFE2-FGheA'
        },
        date: 'Oct 23, 2023',
        total: '$89.99',
        status: 'Delivered'
    }
];

export default function OrdersTable() {
    const columns: Column<Order>[] = [
        {
            header: (
                <div className="w-10 text-center">
                    <input
                        className="rounded border-white/10 bg-[#112117] text-primary focus:ring-0 focus:ring-offset-0"
                        type="checkbox"
                    />
                </div>
            ),
            cell: () => (
                <div className="text-center">
                    <input
                        className="rounded border-white/10 bg-[#112117] text-primary focus:ring-0 focus:ring-offset-0"
                        type="checkbox"
                    />
                </div>
            ),
            className: "w-10"
        },
        {
            header: 'Order ID',
            className: 'font-bold text-white',
            cell: (row) => (
                <span className={cn(row.active ? "text-white" : "text-white/80")}>{row.id}</span>
            )
        },
        {
            header: 'Customer',
            cell: (row) => (
                <div className="flex items-center gap-3">
                    {row.customer.avatar ? (
                        <img
                            className="w-8 h-8 rounded-full border border-white/10"
                            src={row.customer.avatar}
                            alt={row.customer.name}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-900/50 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs font-bold">
                            {row.customer.initials}
                        </div>
                    )}
                    <div>
                        <p className="text-white font-medium">{row.customer.name}</p>
                        <p className="text-gray-500 text-xs">{row.customer.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: 'Date',
            accessorKey: 'date',
            className: 'text-gray-400'
        },
        {
            header: 'Total',
            accessorKey: 'total',
            className: 'font-mono font-medium text-white'
        },
        {
            header: 'Status',
            cell: (row) => {
                let statusStyles = '';
                let dotColor = '';

                if (row.status === 'Processing') {
                    statusStyles = 'bg-blue-500/20 text-blue-400 border-blue-500/20';
                    dotColor = 'bg-blue-400';
                } else if (row.status === 'Shipped') {
                    statusStyles = 'bg-primary/20 text-primary border-primary/20';
                    dotColor = 'bg-primary';
                } else {
                    statusStyles = 'bg-green-500/20 text-green-400 border-green-500/20';
                    dotColor = 'bg-green-400';
                }

                return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyles}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                        {row.status}
                    </span>
                );
            }
        },
        {
            header: 'Actions',
            className: 'text-right',
            cell: () => (
                <button className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            )
        }
    ];

    return (
        <div className="w-full lg:w-[65%] xl:w-[70%] transition-all flex flex-col">
            <DataTable
                data={orders}
                columns={columns}
                className="bg-surface-dark border-white/5"
                onRowClick={() => { }}
            />
            <div className="p-4 border-t border-white/5 flex justify-between items-center bg-[#15261d] rounded-b-2xl border-x border-b border-white/5 -mt-[1px] relative z-10">
                <span className="text-xs text-gray-400">Showing 5 of 1,240 orders</span>
                <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-gray-500 text-sm"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-black font-bold text-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-gray-500 text-sm">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-gray-500 text-sm">3</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-gray-500 text-sm"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                </div>
            </div>
        </div>
    );
}
