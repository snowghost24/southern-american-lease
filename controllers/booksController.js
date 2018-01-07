const  AutoEntry = require("../models/book");
const requesting = require('request');

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res,next) {



  //this array will be returned back to the front end with vehicle info
  var myUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/';
  var vin = req.body.vin
  var obj = { format: "json", data:vin};
     requesting.post({
       headers: {'content-type':'application/json'},
       url:myUrl,
       form: obj
   },function(error, response, body){
    var apiResults = JSON.parse(body)
     if (apiResults["Results"][0]["Make"] == "") {
      // if an error occurs send back this error   
      console.log("this is the error",error);   
      next(res.send({data:"No results found for this vin"}))
     }else{
         
var resultValues = [];
var vin = apiResults["Results"][0]["VIN"];
var make = apiResults["Results"][0]["Make"];
var model = apiResults["Results"][0]["Model"];
var modelYear = apiResults["Results"][0]["ModelYear"];
var series = apiResults["Results"][0]["Series"];
var bodyCabType = apiResults["Results"][0]["BodyCabType"];
var bodyClass =apiResults["Results"][0]["BodyClass"] ;
var trim = apiResults["Results"][0]["Trim"];
var driveType = apiResults["Results"][0]["DriveType"];
var doors = apiResults["Results"][0]["Doors"];
var fuelType = apiResults["Results"][0]["FuelTypePrimary"];
resultValues.push({vin:vin});
resultValues.push({make:make});
resultValues.push({model:model});
resultValues.push({year:modelYear});

if (series != ""){
resultValues.push({series:series});
}

if ( bodyCabType!= ""){
resultValues.push({bodyCabType:bodyCabType});
}

if ( bodyClass!= ""){
resultValues.push({bodyClass:bodyClass});
}

if ( trim != ""){
resultValues.push({trim:trim});
}

if ( driveType != ""){
resultValues.push({driveType:driveType});
}

if ( doors != ""){
resultValues.push({doors:doors});
}

if ( fuelType != ""){
resultValues.push({fuelType:fuelType});
}

console.log(apiResults);
//sends the response back to the client
next(res.send(resultValues))
     }
  });

  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
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
