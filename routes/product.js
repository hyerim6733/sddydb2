var express = require("express");
var router = express.Router();
var Product = require("../model/Product");
var History = require("../model/History");

/* GET users listing. */
router.get("/", function(req, res, next) {
    Product.find(function(err, products) {
        if (err) return next(err);
        res.json(products);
      }).sort({'uploadDate': 'desc'});
});

const fs = require("fs"); // Or `import fs from "fs";` with ESM
function makeFileName(filename){
  var [_filename, ext] = filename.split('.')
  
  var count = 0
  filepath = "public/uploads/" + _filename
  while (fs.existsSync(filepath)) {
      filepath = "public/uploads/" + _filename + count + "." + ext
      count ++;
  }
  return _filename + count;
}

var multer  = require('multer')
// var upload = multer({ dest: 'static/uploads/'});
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
      
      filename = makeFileName( file.originalname)
      
      filedata = {
          name : filename,
          ext : file.mimetype.split('/')[1]
      };
      cb(null, filedata.name + '.' + filedata.ext)
  }
});

const productUpload = multer({storage:storage})

/* POST : product create  */
router.post("/", productUpload.single('file'), function(req, res, next) {
  // TODO : file 핸들링하세요.
  // TODO : 바로 uploads로 저장되어 올라갑니다.
  const file = req.file;
  const data = req.body;
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
