const router = require("express").Router();
var Article = require("../../../model");

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
  .post(function(req, res) {
    var newArticle = new Article(req.body);
    console.log(req.body);
    newArticle.save(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
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