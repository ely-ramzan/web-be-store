const mongoose = require('mongoose');

const ORDER_STATUSES = ['Placed', 'Processing', 'Delivered'];

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
    status: { type: String, enum: ORDER_STATUSES, default: 'Placed' },
    customerInfo: {
        fullName: String, email: String, phone: String,
        address: String, city: String, country: String, zip: String
    }
}, { timestamps: true });

OrderSchema.methods.getNextStatus = function () {
    const idx = ORDER_STATUSES.indexOf(this.status);
    return (idx === -1 || idx >= ORDER_STATUSES.length - 1) ? null : ORDER_STATUSES[idx + 1];
};

OrderSchema.methods.canTransitionTo = function (newStatus) {
    const currentIdx = ORDER_STATUSES.indexOf(this.status);
    const newIdx = ORDER_STATUSES.indexOf(newStatus);
    return currentIdx !== -1 && newIdx !== -1 && newIdx === currentIdx + 1;
};

OrderSchema.statics.getStatuses = function () { return ORDER_STATUSES; };

OrderSchema.methods.advanceStatus = function () {
    const next = this.getNextStatus();
    if (next) { this.status = next; return true; }
    return false;
};

module.exports = mongoose.model('Order', OrderSchema);
