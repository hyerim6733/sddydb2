const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb+srv://blockitTestDB:qmffhrdlt@cluster0-rrg0d.mongodb.net/test?retryWrites=true&w=majority");
autoIncrement.initialize(connection);

const productSchema = new mongoose.Schema({
  pid : Number,
  pname : { type:String, required: true, trim: true},
  category : {type:Number, required: true},
  count : { type : Number, required: true}, /* 거래횟수 */
  price : { type:Number, required: true},
  userid : {type:String, required: true}, /* Users - FK */
  nickname : {type:String, default: '홍길동'},
  content : String,
  uploadDate : { type:Date, default: Date.now },
  allowDateStart : { type:Date, default: Date.now},
  allowDateEnd : Date,
  likeCount : { type: Number, default: 0},
  image : String,
  area : String,
  mystate : String,
  interest : { type: Number, default: 0}    /* 0-관심X, 1-관심상품. */
});

productSchema.plugin(autoIncrement.plugin,
{ 
  model : 'Product', 
  field : 'pid', 
  startAt : 50, //시작 
  increment : 1 // 증가 
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
