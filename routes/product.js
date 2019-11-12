var express = require("express");
var router = express.Router();
var Product = require("../model/Product");
var History = require("../model/History");

/* GET users listing. */
router.get("/", function(req, res, next) {
    Product.find(function(err, products) {
        if (err) return next(err);
        res.json(products);
      });
});


/* POST : product create  */
router.post("/", function(req, res, next) {
    Product.create(req.body, function(err, product) {
    if (err) return next(err);
    res.json(product);
  });
})

/* 단건조회 */
router.get("/:id", function(req, res, next) {
  console.log(req.body);
  Product.findByIdAndUpdate(req.params.id, req.body, function(err, product) {
    if (err) return next(err);
    console.log(product);
    res.json(product);
  });
});

/* 하나삭제 */
router.delete("/:id", function(req, res, next) {
  Product.findByIdAndDelete(req.params.id, function(err, product) {
    if (err) return next(err);
    res.json(product);
  });
});

// router.get("/:id", function(req, res, next) {
//   Product.collection('product').aggregate([
//     { $lookup:
//       {
//         from: 'user',
//         localField: 'userid',
//         foreignField: 'email',
//         as: 'userdetail'
//       }
//     }
//   ]).toArray(function(err, res) {
//     if(err) throw err;
//     console.log(JSON.stringify(res));
    
//   })
// })


/* POST : history create */
router.post("/:id/history", function(req, res, next) {
    newhistory = new History();
    newhistory.rentDate = req.body.rentDate;
    newhistory.returnDate = req.body.returnDate;
    newhistory.repairDate = req.body.repairDate;
    newhistory.userMemo = req.body.userMemo;
    newhistory.repairMemo = req.body.repairMemo;
    newhistory.lender = req.body.lender;
    newhistory.rentalDays = req.body.rentalDays;

    Product.findByIdAndUpdate(
      req.params.id,
      { $push: { histories: newhistory } },
      function(err, product) {
        if (err) return next(err);
        res.redirect(`/product/${req.params.id}`);
      }
    );
});

module.exports = router;
