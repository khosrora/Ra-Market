const mongoose = require('mongoose');



const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        required: []
    },
    paymentCode: String
    ,
    total: Number
}, { timestamps: true })




module.exports = mongoose.model("Payments", paymentSchema)