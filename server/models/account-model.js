const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Account Schema
const accountSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    startingBalance: { type: Number, required: true, default: 0 },
    currentBalance: { type: Number, required: true, default: 0 },
},
    { timestamps: true },
);

const account = mongoose.model("accounts", accountSchema)

module.exports = account;