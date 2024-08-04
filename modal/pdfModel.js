const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true },
    gst: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    isDel: {
        type: Boolean,
        default: false
    },

})
let taskModel = mongoose.model('product', taskSchema)
module.exports = {
    taskModel
}






