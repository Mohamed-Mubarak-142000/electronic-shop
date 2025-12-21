import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';

export default function CreateProductPage() {
    return (
        <div className="flex flex-col w-full max-w-[1200px] mx-auto">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 py-4 text-sm">
                <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors font-medium">Dashboard</Link>
                <span className="text-gray-400 font-medium">/</span>
                <Link href="/admin/products" className="text-gray-400 hover:text-primary transition-colors font-medium">Products</Link>
                <span className="text-gray-400 font-medium">/</span>
                <span className="text-white font-medium">Create Product</span>
            </div>

            {/* Page Heading & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Add New Product</h1>
                    <p className="text-gray-400 text-base font-normal">Fill in the details to create a new electrical component listing.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center rounded-lg h-10 px-4 border border-white/10 bg-transparent text-gray-400 text-sm font-bold hover:bg-white/5 transition-colors">
                        Save Draft
                    </button>
                    <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-background-dark text-sm font-bold shadow-lg hover:bg-green-400 transition-colors">
                        <span className="material-symbols-outlined text-[20px] mr-2">publish</span>
                        Publish Product
                    </button>
                </div>
            </div>

            <ProductForm />

            <div className="h-10"></div>
        </div>
    );
}
