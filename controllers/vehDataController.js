const AutoEntry = require("../models/autos/auto");
const requesting = require('request');

// Defining methods for the booksController
module.exports = {
  //handles entering into db called from helpers enterVehicleDataHelper
  enterVehicle: function (req, res) {
    var newAutoEntry = new AutoEntry(req.body);
    newAutoEntry.save(function(err, doc) {
      if (err) {
        //note sure whey the error had to be inside error
        if (err.name === 'MongoError' && err.code === 11000) {
              res.send("duplicate vehicle entry");
        } 
        console.log(err);
      }
      else {
        console.log("entry success",doc);
        res.send(doc);
      }
    });
  },

  getSavedMarketing: function(req, res) {
    AutoEntry.find({inMarketCart:true} )
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          // console.log("Im sending back docs",doc);
          res.send(doc);
        }
      });
  },

  findById: function (req, res) {
    console.log("Ive alsoe been hit");
    AutoEntry.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  useVinDecoder: function (req, res, next) {
    //this array will be returned back to the front end with vehicle info
    var myUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/';
    var vin = req.body.vin
    var obj = { format: "json", data: vin };
    requesting.post({
      headers: { 'content-type': 'application/json' },
      url: myUrl,
      form: obj
    }, function (error, response, body) {
      var apiResults = JSON.parse(body)
      if (apiResults["Results"][0]["Make"] == "") {
        // if an error occurs send back this error   
        console.log("this is the error", error);
        next(res.send({ data: "No results found for this vin" }))
      } else {

        var resultValues = [];
        var vin = apiResults["Results"][0]["VIN"];
        var lastsix = vin.slice(-6);
        var make = apiResults["Results"][0]["Make"];
        var model = apiResults["Results"][0]["Model"];
        var modelYear = apiResults["Results"][0]["ModelYear"];
        var series = apiResults["Results"][0]["Series"];
        var bodyCabType = apiResults["Results"][0]["BodyCabType"];
        var bodyClass = apiResults["Results"][0]["BodyClass"];
        var trim = apiResults["Results"][0]["Trim"];
        var driveType = apiResults["Results"][0]["DriveType"];
        var doors = apiResults["Results"][0]["Doors"];
        var fuelType = apiResults["Results"][0]["FuelTypePrimary"];
        resultValues.push({ vin: vin });
        resultValues.push({ make: make });
        resultValues.push({ model: model });
        resultValues.push({ year: modelYear });
        resultValues.push({ lastsix: lastsix });
        resultValues.push({ series: series });
        resultValues.push({ bodyCabType: bodyCabType });
        resultValues.push({ bodyClass: bodyClass });
        resultValues.push({ trim: trim });
        resultValues.push({ driveType: driveType });
        resultValues.push({ doors: doors });
        resultValues.push({ fuelType: fuelType });
        console.log(resultValues);
        //sends the response back to the client
        next(res.send(resultValues))
      }
    });

  },


  update: function (req, res) {
    console.log("update id", req.params.id);
    console.log("update body", req.body.theStates);
    console.log("update id", req.params.id);
    AutoEntry.findOneAndUpdate({ _id: req.params.id }, req.body.theStates)
      .then((dbModel) => {
        console.log("the model", dbModel);
        res.send(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};


