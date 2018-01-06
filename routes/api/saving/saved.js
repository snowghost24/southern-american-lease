const router = require("express").Router();
var Article = require("../../../model");
const requesting = require('request');

//This is where api/savings/saved routes are handled
router.route("/")
  .get(function(req, res) {
    Article.find({})
      .exec(function(err, doc) {
        if (err) {
          // console.log(err);
        }
        else {
          res.send(doc);
        }
      });
  })
  .post(function(req, res) {
    var newArticle = new Article(req.body);
    console.log("this is article data", req.body);
    newArticle.save(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(doc);
        res.send(doc);
      }
    });
   
  })
  .delete(function(req, res) {
    var url = req.param("url");
    Article.find({ url: url }).remove().exec(function(err) {
      if (err) {
        // console.log(err);
      }
      else {
        res.send("Deleted");
      }
    });
  })






module.exports = router;