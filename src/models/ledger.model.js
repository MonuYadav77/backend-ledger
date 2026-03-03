const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
    account: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Ledger entry must be associated with an account"],
        index: true,
        immutable: true
    },
    amount:{
        type: Number,
        required: [true, "Amount is required for a ledger entry"],
        immutable: true
    },
    transcation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "transation",
        required: [true, "Ledger entry must be associated with a transcation"],
        index: true,
        immutable: true
    },
    type:{
        type: String,
        enum: {
            values: ["CREDIT", "DEBIT"],
            message: "Type can be either CREDIT or DEBIT",
        },
        required: [true, "Type is required for a ledger entry"],
        immutable: true ,
    },
    
})

function preventLedgerModification() {
    throw new Error("ledger entries cannot be modified or deleted");

}
ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findOneAndRemove", preventLedgerModification);

// created a ledger model based on the ledger schema and export it for use in other parts of the application
const ledgerModel = mongoose.model("ledger", ledgerSchema);

module.exports = ledgerModel;