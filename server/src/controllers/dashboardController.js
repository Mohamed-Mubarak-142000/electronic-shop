import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Brand from '../models/Brand.js';

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments({});
        const totalOrders = await Order.countDocuments({});
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalCategories = await Category.countDocuments({});
        const totalBrands = await Brand.countDocuments({});
        const lowStockCount = await Product.countDocuments({ stock: { $lt: 10 } });

        const orders = await Order.find({});
        const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);

        // Previous stats (for trending, mock for now as we don't have historical data easily accessible without more complex queries)
        // In a real app, we'd compare with last month's stats.

        res.json({
            totalProducts,
            totalOrders,
            totalUsers,
            totalCategories,
            totalBrands,
            totalRevenue,
            lowStockCount,
            trends: {
                revenue: 12.5, // Mock trends for visual consistency if needed, or leave at 0
                orders: 5.2,
                users: 8.1
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get product specific stats
// @route   GET /api/dashboard/products/stats
// @access  Private/Admin
export const getProductStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments({});
        const lowStockCount = await Product.countDocuments({ stock: { $lt: 10 } });

        const products = await Product.find({}, 'price stock');
        const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0);

        res.json({
            totalProducts,
            lowStockCount,
            totalInventoryValue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get category specific stats
// @route   GET /api/dashboard/categories/stats
// @access  Private/Admin
export const getCategoryStats = async (req, res) => {
    try {
        const totalCategories = await Category.countDocuments({});
        res.json({
            totalCategories,
            activeCategories: totalCategories,
            hiddenCategories: 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get brand specific stats
// @route   GET /api/dashboard/brands/stats
// @access  Private/Admin
export const getBrandStats = async (req, res) => {
    try {
        const totalBrands = await Brand.countDocuments({});
        res.json({
            totalBrands,
            activeBrands: totalBrands,
            inactiveBrands: 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
