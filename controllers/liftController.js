const  AutoEntry = require("../models/autos/auto");
// const  AutoEntry = require("../models/auto");
const requesting = require('request');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log("Im in find all");
    // console.log("Find all querys");
    // console.log(req.query.searchType);
    // console.log(req.query.searchItem);
    // var searchType = req.query.searchType;
    // var searchItem = req.query.searchItem.toUpperCase();
    // //Donot search for searchType but for the value 
    // AutoEntry.find({[searchType]:searchItem})
    // .exec(function(err, doc) {
    //   if (err) {
    //     console.log(err);
    //   }
    //   else {
    //     console.log("Find all sent back docs",doc);
    //     res.send(doc);
    //   }
    // });
  },
  findById: function(req, res) {
    console.log("Im in find by ID");
    // AutoEntry.findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },

  create: function(req, res,next) {


  },
  update: function(req, res) {
    console.log("update id",req.params.id);
    console.log("update body",req.body.theStates);
    console.log("update id",req.params.id);
    AutoEntry.findOneAndUpdate({ _id: req.params.id }, req.body.theStates)
      .then((dbModel) => {
        console.log("the model", dbModel );
        res.send(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};


