const  AutoEntry = require("../models/autos/auto");
// const  AutoEntry = require("../models/auto");
const requesting = require('request');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    AutoEntry.find({ detail: { $ne: "none",  }, detailHide:false }).sort({ date: -1 })
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
  },

  findById: function(req, res) {
    console.log("Im in find by ID");
    // AutoEntry.findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
 
  bringBackDetail: function(req, res) {
    var vin = req.body.vin.length;
    if (vin === 6){
      var changes = {detailHide:false}
 AutoEntry.findOneAndUpdate({ lastsix:req.body.vin }, {$set:changes},{ new: true }).collation( { locale: 'en', strength: 2 } )
    .then((dbModel) => {
      console.log("the model is", dbModel );
      res.send(dbModel)})
    .catch(err => res.status(422).json(err));


    } else if (vin > 6) {
      console.log("Im here");
      var changes = {detailHide:false}
      AutoEntry.findOneAndUpdate({ vin:req.body.vin }, {$set:changes},{ new: true }).collation( { locale: 'en', strength: 2 } )
         .then((dbModel) => {
           console.log("the model is", dbModel );
           res.send(dbModel)})
         .catch(err => res.status(422).json(err));
    }

  },
  update: function(req, res) {
    var changes = req.body.newChanges
    AutoEntry.findOneAndUpdate({ _id: req.params.id, detailHide:false }, {$set:changes})
      .then((dbModel) => {
        res.send(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  hide: function(req, res) {
    var changes = {detailHide:true}
    AutoEntry.findOneAndUpdate({ _id: req.params.id }, {$set:changes})
    .then((dbModel) => {
      res.send(dbModel)})
    .catch(err => res.status(422).json(err));
  }
};


