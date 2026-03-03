const mongoose = require('mongoose');

const transcationSchema = new mongoose.Schema({
    fromAccount :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [ true, "Transcation must be associated with a from account"],
        index: true,


    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [ true, "Transcation must be associated with a to account"],      
        index: true,
    },
    status: {
        type: String,
        enum: {
            values: ["PENDING", "COMPLETED", "FAILED","REVERSED"],
        },
        default: "PENDING"

    },
    amount:{
        type: Number,
        required: [true, "Amount is required for a transcation"],
        min: [ 0,"Amount must be a positive number"]

    },
    idempotencyKey: {
        type: String,
        required: [true, "Idempotency key is required for a transcation"],
        unique: true,  
    }
}, {
    timestamps: true     
})

const transcationModel = mongoose.model("transcation", transcationSchema);

module.exports = transcationModel;