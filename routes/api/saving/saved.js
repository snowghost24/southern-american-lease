const router = require("express").Router();
var Article = require("../../../model");
const requesting = require('request');

// Matches with "/api/books"
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
  .post(function(req, res, next) {
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
        next(res.send({data:"No results found for this vin"}))
       }else{
var resultValues = [];

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