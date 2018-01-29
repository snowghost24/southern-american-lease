const router = require("express").Router();
var AutoEntry = require("../../../models/auto");
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
          // console.log("Im sending back docs",doc);
          res.send(doc);
        }
      });
  })
  .post(function(req, res) {
    var newAutoEntry = new AutoEntry(req.body);
    // console.log("Entry Data", req.body);
    newAutoEntry.save(function(err, doc) {
      if (err) {
        //note sure whey the error had to be inside error
        if (err.name === 'MongoError' && err.code === 11000) {
        
          // console.log("this is a duplicate entry");
          res.send("duplicate vehicle entry");
        } 
        console.log(err);
      }
      else {
        // console.log("this is the doc",doc);
        res.send(doc);
      }
    });
   
  })
  .delete(function(req, res) {
    var vin = req.param("vin");
    console.log("im deleting", vin);-
    AutoEntry.find({ vin:vin }).remove().exec(function(err) {
      if (err) {
        // console.log(err);
      }
      else {
        res.send("Deleted");
      }
    });
  })
  .put(function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }),






module.exports = router;