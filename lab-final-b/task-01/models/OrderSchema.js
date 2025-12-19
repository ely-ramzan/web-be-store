const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String }
});

const OrderSchema = new mongoose.Schema({
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true },
    discountApplied: { type: Boolean, default: false },
    couponCode: { type: String, default: '' },
    discountAmount: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Placed'
    },
    customerInfo: {
        fullName: String, email: String, phone: String,
        address: String, city: String, country: String, zip: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
