const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');


var connection = mongoose.createConnection("mongodb+srv://blockitTestDB:qmffhrdlt@cluster0-rrg0d.mongodb.net/test?retryWrites=true&w=majority");

autoIncrement.initialize(connection);

// 1. 스키마 설정
const boardSchema = new mongoose.Schema({
  seq: Number,
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  created_at: { type: Date, default: Date.now },
  comments: [
    // 배열을 나타냄
    {
      content: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

boardSchema.plugin(autoIncrement.plugin,
{ 
  model : 'Board', 
  field : 'seq', 
  startAt : 1, //시작 
  increment : 1 // 증가 
});

// 2. 모델 만들기
const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
