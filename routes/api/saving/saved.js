const router = require("express").Router();
var Article = require("../../../model");
const requesting = require('request');
var resultValues = [];


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
    //this array will be returned back to the front end with vehicle info
    // var newArticle = new Article(req.body);
    // console.log(req.body);
    var myUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/';
    var vin = req.body
    var obj = { format: "json", data:vin.vin};
      //  console.log(req.body);
       requesting.post({
         headers: {'content-type':'application/json'},
         url:myUrl,
         form: obj
     },function(error, response, body){
      var apiResults = JSON.parse(body)
       if (apiResults["Results"][0]["Make"] == "") {
         console.log(error);
         console.log(response);
        // if an error occurs send back this error      
        next(res.send({data:"No results found for this vin"}))
       }else{
var resultValues = [];

resultValues.push({"make":apiResults["Results"][0]["Make"]});
resultValues.push({"model":apiResults["Results"][0]["Model"]});
resultValues.push({"modelYear":apiResults["Results"][0]["ModelYear"]});

if (apiResults["Results"][0]["Series"] != ""){
 resultValues.push({"Series":apiResults["Results"][0]["Series"]});
}

if (apiResults["Results"][0]["BodyCabType"] != ""){
 resultValues.push({"bodyCabType":apiResults["Results"][0]["BodyCabType"]});
}

if (apiResults["Results"][0]["BodyClass"] != ""){
 resultValues.push({"bodyClass":apiResults["Results"][0]["BodyClass"]});
}

if (apiResults["Results"][0]["Trim"] != ""){
 resultValues.push({"trim":apiResults["Results"][0]["Trim"]});
}

if (apiResults["Results"][0]["DriveType"] != ""){
 resultValues.push({"driveType":apiResults["Results"][0]["DriveType"]});
}

if (apiResults["Results"][0]["Doors"] != ""){
 resultValues.push({"doors":apiResults["Results"][0]["Doors"]});
}

if (apiResults["Results"][0]["FuelTypePrimary"] != ""){
 resultValues.push({"fuelType":apiResults["Results"][0]["FuelTypePrimary"]});
}
//  console.log(error);
// console.log(apiResults);
next(res.send({data:resultValues}))
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