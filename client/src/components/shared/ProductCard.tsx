import Image from 'next/image';
import Link from 'next/link';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    // Using 'any' for image for now to support both string URL and object structure until strictly typed
    images?: any[];
    imageUrl?: string; // Fallback or direct URL
    rating?: number;
    reviewCount?: number;
    discount?: number;
}

export default function ProductCard({ product }: { product: Product }) {
    // Helper to determine image source
    const imageSrc = product.imageUrl ||
        (product.images && product.images.length > 0 ? product.images[0] : null) ||
        "https://placehold.co/400x300?text=No+Image";

    return (
        <div className="group relative bg-surface-dark rounded-[2rem] p-4 hover:bg-surface-highlight transition-all duration-300 flex flex-col h-full font-display">
            <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-white mb-4">
                {/* Using standard img tag for external URLs/placeholders or Next Image if optimized is preferred.
            Design uses 'img', keeping it simple for now to match behavior with arbitrary URLs. 
        */}
                <Link href={`/product/${product._id}`}>
                    <img
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        src={imageSrc}
                    />
                </Link>
                {product.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex text-yellow-400 text-xs mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`material-symbols-outlined text-sm ${star <= (product.rating || 5) ? 'filled' : ''}`}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            star
                        </span>
                    ))}
                    <span className="text-gray-400 ml-1">({product.reviewCount || 0})</span>
                </div>

                <Link href={`/product/${product._id}`}>
                    <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors cursor-pointer">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.discount ? (
                            <>
                                <span className="text-gray-500 text-sm line-through">${(product.price * (1 + product.discount / 100)).toFixed(2)}</span>
                                <span className="text-primary text-xl font-bold">${product.price}</span>
                            </>
                        ) : (
                            <span className="text-primary text-xl font-bold">${product.price}</span>
                        )}
                    </div>
                    <button className="size-10 rounded-full bg-[#122118] border border-surface-highlight text-white flex items-center justify-center hover:bg-primary hover:text-[#122118] hover:border-primary transition-all shadow-[0_0_15px_rgba(54,226,123,0)_hover:shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
