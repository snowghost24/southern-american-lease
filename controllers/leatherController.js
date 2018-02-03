const  AutoEntry = require("../models/autos/auto");
// const  AutoEntry = require("../models/auto");
const requesting = require('request');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    // console.log("Im in find all");
    // console.log("Find all querys");
    // console.log(req.query.searchType);
    // console.log(req.query.searchItem);
    // var searchType = req.query.searchType;
    // var searchItem = req.query.searchItem.toUpperCase();
    //Donot search for searchType but for the value 
    // find({[searchType]:searchItem})
   
    AutoEntry.find({ leatherColor: { $ne: "none",  }, detailHide:false }).sort({ date: -1 })
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
  // create: function(req, res, next) {
  create: function(req, res) {
    var vin = req.body.vin.length;


    if (vin === 6){
      var changes = {detailHide:false}
 AutoEntry.findOneAndUpdate({ lastsix:req.body.vin }, {$set:changes})
    .then((dbModel) => {
      console.log("the model is", dbModel );
      res.send(dbModel)})
    .catch(err => res.status(422).json(err));


    } else if (vin > 6) {
      console.log("Im here");
      var changes = {detailHide:false}
      AutoEntry.findOneAndUpdate({ vin:req.body.vin }, {$set:changes})
         .then((dbModel) => {
           console.log("the model is", dbModel );
           res.send(dbModel)})
         .catch(err => res.status(422).json(err));


    }
    // AutoEntry.findOneAndUpdate({ vin: req.params.id, detailHide:false }, {$set:changes},{upsert:true})
    // .then((dbModel) => {
    //   console.log("the model is", dbModel );
    //   res.send(dbModel)})
    // .catch(err => res.status(422).json(err));

  },
  update: function(req, res) {
    // console.log("update id",req.params.id);
    // console.log("update body", req.body.theNewColor.leathercolor);
    var changes = req.body.newChanges
    console.log(changes);
    console.log("we made it to update");
    AutoEntry.findOneAndUpdate({ _id: req.params.id, detailHide:false }, {$set:changes},{upsert:true})
      .then((dbModel) => {
        console.log("the model is", dbModel );
        res.send(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    var changes = {detailHide:true}
    AutoEntry.findOneAndUpdate({ _id: req.params.id }, {$set:changes},{upsert:true})
    .then((dbModel) => {
      console.log("the model is", dbModel );
      res.send(dbModel)})
    .catch(err => res.status(422).json(err));

    // AutoEntry.findById({ _id: req.params.id })
    //   .then(dbModel => dbModel.remove())
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }
};


