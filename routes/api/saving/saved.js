const router = require("express").Router();
var AutoEntry = require("../../../models/book");
const requesting = require('request');

//This is where api/savings/saved routes are handled
router.route("/")
  .get(function(req, res) {
    AutoEntry.find({})
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Im sending back docs",doc);
          res.send(doc);
        }
      });
  })
  .post(function(req, res) {
    var newAutoEntry = new AutoEntry(req.body);
    console.log("this is article data", req.body);
    newAutoEntry.save(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("this is the doc",doc);
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