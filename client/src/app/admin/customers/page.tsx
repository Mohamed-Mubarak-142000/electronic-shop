import Link from 'next/link';
import CustomersTable from '@/components/admin/CustomersTable';

export default function CustomersPage() {
    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            {/* Header */}
            <header className="bg-background-dark border-b border-white/5 py-5 px-8 flex flex-col gap-6 sticky top-0 z-10">
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div>
                        <h2 className="text-white text-3xl font-black leading-tight tracking-[-0.02em]">Customers</h2>
                        <p className="text-gray-400 text-sm mt-1">Manage user accounts and permissions.</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <CustomersTable />
            </div>
        </div>
    );
}
