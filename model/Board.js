const mongoose = require("mongoose");

// 1. 스키마 설정
const boardSchema = new mongoose.Schema({
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

// 2. 모델 만들기
const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
