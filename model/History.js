const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
    rentDate : Date,
    returnDate : Date,
    repairDate : Date,
    userMemo : String,
    repairMemo : String,
    lender : String, 
    rentalDays : Number
});

module.exports = mongoose.model("History", historySchema);


