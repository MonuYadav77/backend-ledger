const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: "user",
        required: [true, "Account must be associated with a user"],
        index: true
    },
    status : {
        type: String,
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can be active, frozen or closed",
        },
        default: "ACTIVE"
    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account"],
        default:"INR"
    }
}, {
    timestamps: true
})

accountSchema.index({user:1,status:1}); // create a compound index on user and status fields for faster queries
const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;