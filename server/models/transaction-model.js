const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create transaction model
const transactionSchema = new Schema(
    {
        accountId: { type: String, required: true },
        account: { type: String, required: false},
        date: { type: Date, required: true },
        description: { type: String, required: true },
        amount: { type: Number, required: true },
        category: { type: String, required: true, 
            enum: [ "Uncategorized",
                "Income",
                "Charity",
                "Savings",
                "Housing",
                "Utilities",
                "Food",
                "Transportation",
                "Clothing",
                "Medical/Health",
                "Personal",
                "Recreation",
                "Debts" ] },
        subcategory: { type: String, required: false },
        memo: { type: String, required: false },
        isCleared: { type: Boolean, required: true, default: false },
    },
        { timestamps: true },
);

const transaction = mongoose.model("transactions", transactionSchema)

module.exports = transaction;