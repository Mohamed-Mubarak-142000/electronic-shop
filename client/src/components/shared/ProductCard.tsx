import Link from 'next/link';
import { useCartStore } from "@/store/useCartStore";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images?: string[];
    imageUrl?: string;
    rating?: number;
    numReviews?: number;
    discount?: number;
    brand?: {
        _id: string;
        name: string;
    };
    category?: {
        _id: string;
        name: string;
    };
}

export default function ProductCard({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    // Helper to determine image source
    const imageSrc = product.imageUrl ||
        (product.images && product.images.length > 0 ? product.images[0] : null) ||
        "https://placehold.co/400x300?text=No+Image";

    // Brand name fallback
    const brandName = typeof product.brand === 'object' ? product.brand?.name : '';

    const handleAddToCart = () => {
        addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: imageSrc,
            subtitle: product.description,
            sku: product._id.substring(0, 8).toUpperCase(),
            inStock: true
        });
    };

    return (
        <div className="group relative bg-surface-dark rounded-[2rem] p-4 hover:bg-surface-highlight transition-all duration-300 flex flex-col h-full font-display border border-surface-highlight/10 hover:border-primary/20">
            <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-white mb-4 shadow-inner">
                <Link href={`/product/${product._id}`}>
                    <img
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        src={imageSrc}
                    />
                </Link>
                {product.discount && product.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        -{product.discount}%
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex text-yellow-400 text-xs">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`material-symbols-outlined text-sm ${(product.rating || 5) >= star ? 'filled' : ''}`}
                                style={{ fontVariationSettings: (product.rating || 5) >= star ? "'FILL' 1" : "" }}
                            >
                                star
                            </span>
                        ))}
                        <span className="text-gray-400 ml-1">({product.numReviews || 0})</span>
                    </div>
                    {brandName && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#95c6a9] bg-[#95c6a9]/10 px-2 py-0.5 rounded-md">
                            {brandName}
                        </span>
                    )}
                </div>

                <Link href={`/product/${product._id}`}>
                    <h3 className="text-white font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors cursor-pointer line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.discount ? (
                            <>
                                <span className="text-gray-500 text-sm line-through">${(product.price * (1 + product.discount / 100)).toFixed(2)}</span>
                                <span className="text-primary text-xl font-bold">${product.price.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="text-primary text-xl font-bold">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="size-10 rounded-full bg-[#122118] border border-surface-highlight text-white flex items-center justify-center hover:bg-primary hover:text-[#122118] hover:border-primary transition-all shadow-[0_0_15px_rgba(54,226,123,0)_hover:shadow-[0_0_15px_rgba(54,226,123,0.3)]"
                    >
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
