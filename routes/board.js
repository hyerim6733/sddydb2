let express = require("express");
let router = express.Router();
let Board = require("../model/Board");

router.get("/", function(req, res, next) {
  Board.find(function(err, boards) {
    if (err) return next(err);
    res.json(boards);
  });
});

router.get("/:id", function(req, res, next) {
  console.log(req.params);
  Board.findById(req.params.id, function(err, board) {
    if (err) return next(err);
    else if (!board) return next(err);

    res.json(board);
  });
});

router.post("/", function(req, res, next) {
  Board.create(req.body, function(err, board) {
    if (err) return next(err);
    res.json(board);
  });
});

// module.exports = router;

router.put("/:id", function(req, res, next) {
  console.log(req.body);
  Board.findByIdAndUpdate(req.params.id, req.body, function(err, board) {
    if (err) return next(err);
    console.log(board);
    res.json(board);
  });
});

router.delete("/:id", function(req, res, next) {
  console.log(req.param.id);
  Board.findByIdAndDelete(req.params.id, function(err, board) {
    if (err) return next(err);
    // console.log(err);
    // console.log(board);
    res.json(board);
  });
});

const Comment = require("../model/Comment");
router.post("/:id/comment", function(req, res, next) {
  comment = new Comment();
  comment.content = req.body.content;

  Board.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: comment } },
    function(err, board) {
      if (err) return next(err);
      res.redirect(`/board/${req.params.id}`);
    }
  );

  // 또는
  // board.comments.push(req.body);
});

router.delete("/:id/comment/:commentId", function(req, res, next) {
  Board.findById(req.params.id, function(err, board) {
    board.comments.pull({ _id: req.params.commentId });

    board.save();

    res.redirect(`/board/${req.params.id}`);
  });
});

module.exports = router;
