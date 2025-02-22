const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : { type:String, required: true },
    nickname : { type:String, required: true},
    password : { type:String, required: true},
    area : { type:String },
    signupDate : { type : Date, default : Date.now }
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
