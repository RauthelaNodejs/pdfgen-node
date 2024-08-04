const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now },
    products: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            rate: { type: Number, required: true },
            gst: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    gstTotal: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    pdf: { type: Buffer, required: true }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
