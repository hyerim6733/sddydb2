var express = require("express");
var router = express.Router();
var User = require("../model/User");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});


/* POST : user creator  */
router.post("/", function(req, res, next) {
  User.create(req.body, function(err, board) {
    if (err) return next(err);
    res.json(board);
  });
})

module.exports = router;
