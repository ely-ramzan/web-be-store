const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    image: { type: String },
    category: {
        type: String,
        required: true,
        enum: ['for-her', 'for-him']
    },
    productType: {
        type: String,
        required: true,
        enum: ['clothing', 'shoes', 'accessories']
    },
    stock: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);