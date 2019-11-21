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
    console.log(product);
    console.log(product.pid);
    res.json(product);
  });
})

/* 단건조회 */
router.get("/:id", function(req, res, next) {
  Product.findById(req.params.id, function(err, prod){
    if(err) return res.status(500).json({ error: 'database failure' });
    if(!prod) return res.status(404).json({ error: 'product not found' });
    res.json(prod);
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
// router.post("/:id/history", function(req, res, next) {
//     newhistory = new History();
//     newhistory.rentDate = req.body.rentDate;
//     newhistory.returnDate = req.body.returnDate;
//     newhistory.repairDate = req.body.repairDate;
//     newhistory.userMemo = req.body.userMemo;
//     newhistory.repairMemo = req.body.repairMemo;
//     newhistory.lender = req.body.lender;
//     newhistory.rentalDays = req.body.rentalDays;

//     Product.findByIdAndUpdate(
//       req.params.id,
//       { $push: { histories: newhistory } },
//       function(err, product) {
//         if (err) return next(err);
//         res.redirect(`/product/${req.params.id}`);
//       }
//     );
// });


/* POST : index ++  >???????????????? */
router.post("/", function(req, res, next) {
  Product.create(req.body, function(err, product) {
  if (err) return next(err);
  res.json(product);
});
})

  // mystate change [ "대여중" <-> "대여완료" ]
 router.put('/:id/mystate', function(req, res, next){
  Product.findById(req.params.id, function(err, prod){
      if(err) return res.status(500).json({ error: 'database failure' });
      if(!prod) return res.status(404).json({ error: 'product not found' });

      if(prod.mystate && prod.mystate == "대여중") { 
          prod.mystate = "대여완료";
          prod.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'product mystate updated'});
        });
      } 
      else if(!prod.mystate) {
        prod.update({ $set: { mystate: "대여중" }},
        (function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'product mystate 대여중'});
          }
        )
      );
    }
  });
});

// 관심상품 interest
router.put('/:id/interest', function(req, res, next){
  Product.findById(req.params.id, function(err, prod){
      if(err) return res.status(500).json({ error: 'database failure' });
      if(!prod) return res.status(404).json({ error: 'product not found' });

      //prod.interest == 1 ? prod.interest = 0 : prod.interest = 1;
      if(prod.interest == 1) {
        prod.interest = 0;
        if(prod.likeCount) prod.likeCount--;
        else prod.likeCount = 0;
      } 
      else {
        prod.interest = 1;
        if(prod.likeCount) prod.likeCount++;
        else prod.likeCount = 1;
      }

        prod.save(function(err){
          if(err) res.status(500).json({error: 'failed to update'});
          res.json({message: 'product interest updated'});
      });
  });
});

module.exports = router;
