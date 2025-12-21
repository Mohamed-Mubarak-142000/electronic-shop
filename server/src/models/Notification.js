import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'order_status', 'new_product'
    title: { type: String, required: true },
    body: { type: String, required: true },
    meta: { type: Object }, // Extra data like orderId
    read: { type: Boolean, default: false }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
