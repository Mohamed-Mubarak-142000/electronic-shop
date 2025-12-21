import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true } // Price at time of purchase
    }],
    total: { type: Number, required: true },
    shipping: {
        address: { type: String, required: true },
        cost: { type: Number, default: 0 }
    },
    paymentMethod: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
