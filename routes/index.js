var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "ㅆㄷㄷㅇ" });
});

router.get("/main", function(req, res, next) {
  res.render("main", { title: "ㅆㄷㄷㅇ" });
});

module.exports = router;
