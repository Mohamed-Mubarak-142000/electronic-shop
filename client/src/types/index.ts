export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'business';
    avatar?: string;
    token?: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    description?: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: Category | string;
    brand: Brand | string;
    images: string[];
    stock: number;
    rating: number;
    numReviews: number;
    createdAt: string;
    updatedAt: string;
    salePrice?: number;
    isDiscountActive?: boolean;
}

export interface DiscountSchedule {
    _id: string;
    product: Product;
    type: 'percentage' | 'fixed';
    value: number;
    startTime: string;
    endTime: string;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    createdAt: string;
}
