const router = require("express").Router();
var Article = require("../../../model");
const requesting = require('request')


// Matches with "/api/books"
router.route("/")
  .get(function(req, res) {
    Article.find({})
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      });
  })
  .post(function(req, res, next) {
    var newArticle = new Article(req.body);
    console.log(req.body);
    var myUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/';
    var x = 1;
    var vin = req.body
    var obj = { format: "json", data:vin.vin};
       console.log(req.body);
       requesting.post({
         headers: {'content-type':'application/json'},
         url:myUrl,
         form:    obj
     },function(error, response, body){
       console.log(body);
      var results = JSON.parse(body)
      results = results["Results"][0]["Model"];
      next(res.send({data:results}))
  
    });

 
  

  })
  .delete(function(req, res) {
    var url = req.param("url");
    Article.find({ url: url }).remove().exec(function(err) {
      if (err) {
        console.log(err);
      }
      else {
        res.send("Deleted");
      }
    });
  })






module.exports = router;