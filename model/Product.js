const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pid : {type:String, required: true, unique: true, lowercase: true},
  pname : { type:String, required: true, trim: true},
  category : {type:Number, required: true},
  count : { type : Number, required: true}, /* 거래횟수 */
  price : { type:Number, required: true},
  userid : {type:String, required: true}, /* Users - FK */
  content : String,
  uploadDate : { type:Date, default: Date.now },
  allowDateStart : { type:Date, default: Date.now},
  allowDateEnd : Date,
  likeCount : { type: Number, default: 0},
  image : String,
  area : String

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
